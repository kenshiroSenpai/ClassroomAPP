import { Component, OnInit } from '@angular/core';
import { Users } from '../interfaces/users';
import { Router, NavigationExtras } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.page.html',
  styleUrls: ['./admin-user.page.scss'],
})
export class AdminUserPage implements OnInit {

  users: Array<Users>;
  dni: String;
  username: String;
  oldUsername: String;

  constructor(private apollo: Apollo, private toastController: ToastController,
    private alertController: AlertController, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.username = this.router.getCurrentNavigation().extras.state.username;
    }
    this.loadUsers();
  }

  async loadUsers() {
    const getAllUsers = gql`
    {
      getAllUsers{
      username
      password
      privileges
      studentsDni{
        dni
        }
      }
    }
    `;
    const query = this.apollo.watchQuery<any>({
      query: getAllUsers,
      fetchPolicy: "no-cache"
    });
    query.valueChanges.subscribe(result => {
      this.users = result.data.getAllUsers;
    }, error => {
      console.log(error);
    });
  }

  async deleteUser(username: String) {
    const deleteUser = gql`
    mutation deleteUser($username: ID!){
      deleteUser(username: $username)
    }
    `;
    if (this.username !== username) {
      this.apollo.mutate<any>({
        mutation: deleteUser,
        fetchPolicy: "no-cache",
        variables: {
          username: username
        }
      }).subscribe(({ data }) => {
        this.presentToast("Deleted correctly!");
        this.loadUsers();
      }, error => {
        console.log(error);
      });
    } else {
      this.presentToast("This user is active!");

    }
  }

  async goToUpdateUserInfo(user:Users){
    let navigationExtras: NavigationExtras = {
      state:{
        user: user
      }
    }
    this.router.navigate(['/update-user-info'], navigationExtras);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm(username: String) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'If you accept, you <strong>delete this user</strong>!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Accept',
          handler: () => {
            this.deleteUser(username);
          }
        }
      ]
    });
    await alert.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { Users } from '../interfaces/users';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.page.html',
  styleUrls: ['./update-user-info.page.scss'],
})
export class UpdateUserInfoPage implements OnInit {

  user: Users = {
    username: "",
    password: "",
    privileges: "",
    studentsDni: null
  };
  privileges: String;
  formAdmin: FormGroup;

  constructor(private apollo: Apollo, private toastController: ToastController,
    private alertController: AlertController, private router: Router, private formBuilder: FormBuilder) {

    this.formAdmin = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-z]+[0-9]*'), Validators.required])],
      privileges: ['', Validators.required],
      dni: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[0-9]{8}[a-zA-z]{1}')])],
      password: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(16) , Validators.required])]
    });

  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.user = this.router.getCurrentNavigation().extras.state.user;
      this.privileges = "";
    }
  }

  async updateUser(user: Users, newUsername: String) {
    let dni: String = "";
    const updateUser = gql`
    mutation updateUser($username: ID!, $newUsername: ID!, $password: String!, $privileges: String!, $studentsDni: String!){
      updateUser(username: $username, newUsername: $newUsername, password: $password, privileges: $privileges, studentsDni: $studentsDni)
    }
    `;
    console.log(user);
    console.log(newUsername);
    if(this.formAdmin.value['dni'] !== ""){
      dni = this.formAdmin.value['dni']
    }
    if(user.username === ""){
      user.username = this.user.username;
    }
    console.log(dni);
    
    this.apollo.mutate<any>({
      mutation: updateUser,
      fetchPolicy: "no-cache",
      variables: {
        username: user.username,
        newUsername: newUsername,
        password: this.formAdmin.value['password'],
        privileges: user.privileges.substring(5),
        studentsDni: dni
      }
    }).subscribe(({ data }) => {
      this.presentToast("Updated correctly!");
    }, error => {
      console.log(error);
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
    //this.router.navigateByUrl('/admin-user', )
    //this.router.onSameUrlNavigation = 'reload';
    //this.router.initialNavigation();
    this.router.navigate(['/user-info']);
  }

  async presentAlertUpdatePrivileges(user: Users) {
    const alert = await this.alertController.create({
      header: 'Privileges: ?',
      message: '<strong>Check type of privileges.</strong>',
      inputs: [
        {
          name: "privileges1",
          type: "radio",
          label: "admin",
          value: "ROLE_ADMIN"
        },
        {
          name: "privileges2",
          type: "radio",
          label: "user",
          value: "ROLE_USER"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Accept',
          handler: (data) => {
            this.privileges = data;
            user.privileges = data;
            console.log(data);

          }
        }
      ]
    });
    await alert.present();
  }
}

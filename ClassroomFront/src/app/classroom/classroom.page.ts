import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Classroom } from '../interfaces/classroom';
import { Router, NavigationExtras } from '@angular/router';
import gql from 'graphql-tag';
import { LocalDBService } from '../services/local-db.service';
import { Users } from '../interfaces/users';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {

  classrooms: Array<Classroom>;
  classroomsLocal: Array<Classroom>;
  user: Users;

  constructor(private apollo: Apollo, private router: Router,
    private localDb: LocalDBService, private alertController: AlertController,
    private toastController: ToastController) {
      this.localDb.createClassroom();
     }

  ngOnInit() {
    this.loadData();
    this.loadClassroom();
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.user = this.router.getCurrentNavigation().extras.state.userInfo;
    }
  }

  async loadLocalClassroom() {
    this.localDb.insertRows('classroom', this.classrooms);
  }

  async readClassroom() {
    this.localDb.getRows('classroom').subscribe(data => {
      this.classroomsLocal = data;
    });
  }

  async loadClassroom() {
    const getClassroom = gql`
    {
      getAllClassroom{
        number
        building
      }
    }
  `;

    const query = this.apollo.watchQuery<any>({
      query: getClassroom,
      fetchPolicy: "no-cache"
    });

    query.valueChanges.subscribe((result) => {
      this.classrooms = result.data.getAllClassroom;
      this.loadLocalClassroom();
      this.readClassroom();
    },
      error => {
      });
  }

  async goToClassroom(classroom: Classroom) {
    let navigationExtras: NavigationExtras = {
      state: {
        classroomInfo: classroom
      }
    }
    this.router.navigate(['reserve-classroom'], navigationExtras);
  }

  // filterList(event: any){
  //   const val = event.target.value;
  //   console.log("entro");
  //   if(val && val.trim() != ''){

  //     this.classrooms = this.classrooms.filter((item) => {
  //       return (item.number.indexOf(val) > -1);
  //     })
  //   }
  // }

  async goToCreateClassroom() {
    this.router.navigate(['create-classroom']);
  }

  async deleteClassroom(number: string) {
    const deleteClassroom = gql`
    mutation deleteClassroom($number: ID!){
      deleteClassroom(number: $number)
    }
  `;
    this.apollo.mutate<any>({
      mutation: deleteClassroom,
      variables: {
        number: number
      }
    }).subscribe(()  => {
      this.localDb.deleteRow('classroom', number);
      this.readClassroom();
      this.loadClassroom();
      this.presentToastSuccess();
    }, error => {
      console.log(error);
    });
  }

  async presentAlertConfirm(number: string) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'If you accept, you <strong>delete this classroom</strong>!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Accept',
          handler: () => {
            console.log(number);
            this.deleteClassroom(number);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: `Done!`,
      duration: 1000
    });
    toast.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Role } from '../interfaces/role';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-reserve',
  templateUrl: './my-reserve.page.html',
  styleUrls: ['./my-reserve.page.scss'],
})
export class MyReservePage implements OnInit {

  constructor(private apollo: Apollo, private router: Router, private alertController: AlertController) { }

  myRole: Array<Role> = [];

  ngOnInit() {
    this.loadDni();
  }

  async loadReserve(dniUser: String) {
    const getRoleWithDni = gql`
  query getRoleWithDni($dni: ID!){
    getRoleWithDni(dni: $dni){
      reserve{
          idReserve
          classroomNumber{
              number
          }
        startTime
        endTime
      }
    responsible
    studentDni{
        dni
    }
  }
  }
    `;

    const query = this.apollo.watchQuery<any>({
      query: getRoleWithDni,
      fetchPolicy: "no-cache",
      variables: {
        dni: dniUser
      }
    });
    query.valueChanges.subscribe(result => {
      this.myRole = result.data.getRoleWithDni;
    });
  }

  async loadDni() {
    let username: String;
    if (this.router.getCurrentNavigation().extras.state) {
      username = this.router.getCurrentNavigation().extras.state.userInfo.username;
    }

    const getUser = gql`
    query getUser($username: ID!){
      getUser(username: $username){
          username,
          password,
          privileges,
          studentsDni{
            dni
        }
      }
    }
    `;

    const query = this.apollo.watchQuery<any>({
      query: getUser,
      fetchPolicy: "network-only",
      variables: {
        username: username
      }
    });
    query.valueChanges.subscribe(result => {
      if (result.data.getUser.studentsDni === null) {
        this.loadReserve("empty");
      } else {
        let dniUser = result.data.getUser.studentsDni.dni;
        this.loadReserve(dniUser);
      }
    }, error => {
      console.log("error");

    });
  }

  async deleteReserve(id: String) {
    const deleteReserve = gql`
    mutation deleteReserve($idReserve: ID!){
      deleteReserve(idReserve: $idReserve)
    }
    `;
    console.log(id);
    
    this.apollo.mutate<any>({
      mutation: deleteReserve,
      fetchPolicy: "no-cache",
      variables: {
        idReserve: id
      }
    }).subscribe(({ data }) => {
      console.log("donete");
    }, error => {
      console.log(error);
    });
  }

  async presentAlertConfirm(id: String) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'If you accept, you <strong>delete you reserve</strong>!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Accept',
          handler: () => {
            this.deleteReserve(id);
          }
        }
      ]
    });
    await alert.present();
  }

    async goToReserveClassroom(){
      this.router.navigate(['/classroom']);
    }

  }

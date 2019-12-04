import { Component, OnInit } from '@angular/core';
import { Classroom } from '../interfaces/classroom';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reserve-classroom',
  templateUrl: './reserve-classroom.page.html',
  styleUrls: ['./reserve-classroom.page.scss'],
})
export class ReserveClassroomPage implements OnInit {

  classroomReserve: Classroom;
  dniResponsible: string;
  otherDni: String = "";
  arrayOthersDni: Array<String> = [];
  startDate: String;
  startTime: String;
  endDate: String;
  endTime: String;
  dniTemp: String;

  constructor(private apollo: Apollo, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.classroomReserve = this.router.getCurrentNavigation().extras.state.classroomInfo;
    }
  }

  //load dni in array of dni.
  async loadArrayOthersDni() {
    try {
      await this.validateDni(this.otherDni);
      if (this.otherDni !== this.dniResponsible) {
        if (this.arrayOthersDni.length < 1) {
          this.arrayOthersDni[this.arrayOthersDni.length] = this.otherDni
        } else {
          this.arrayOthersDni[this.arrayOthersDni.length + 1] = this.otherDni
        }
      } else {
        console.log("error dni duplicate");
      }
    } catch (error) {
      console.log("no exist dni.");
    }

  }

  async validateDni(dni: String) {
    const getByDni = gql`
    query getByDni($dni: ID!){
      getByDni(dni: $dni){
          dni
          name
          firstSurname
          secondSurname
          reserveClassroom
          dateOfBirth
      }
  }
  `;
    const query = this.apollo.watchQuery<any>({
      query: getByDni,
      variables: {
        dni: dni
      }
    });

    query.valueChanges.subscribe(result => {
      if (result.data.getByDni === null) {
        throw "Error";
      }
      console.log("bueno");
    }, error => {
      console.log("validate dni: " + error);
    });
  }

  //delete one by one elements in array of dni.
  async deleteOtherDni(deleteDni: String) {
    const result = this.arrayOthersDni.filter(data => data !== deleteDni);
    this.arrayOthersDni = result;
  }

  async createReserveWithRole() {
    this.validateDni(this.dniResponsible);
    //Format date and time.
    const startDateFormat = this.startDate.split("T");
    const endDateFormat = this.endDate.split("T");
    const startTimeFormat = this.startTime.split("T");
    const endTimeFormat = this.endTime.split("T");

    const createReserve = gql`
    mutation createReserve($classroomNumber: ID!, $startTime: String!, $endTime: String!){
      createReserve(classroomNumber: $classroomNumber, startTime: $startTime, endTime: $endTime){
      idReserve
      classroomNumber{
        number
      }
      startTime
      endTime
      }
  }
  `;
    this.apollo.mutate<any>({
      mutation: createReserve,
      variables: {
        classroomNumber: this.classroomReserve.number,
        startTime: startDateFormat[0] + " " + startTimeFormat[1].substring(0, 5),
        endTime: endDateFormat[0] + " " + endTimeFormat[1].substring(0, 5)
      }
    }).subscribe(({ data }) => {
      this.createRole(data.createReserve.idReserve);
      this.router.navigate(['/home']);
      this.presentToastSuccess();
    }, error => {
      console.log(error);
    });
  }

  async createRole(id: String) {
    const createRole = gql`
    mutation createRole($reserveId: ID!, $responsible: Boolean!, $studentDni: ID!){
      createRole(reserveId: $reserveId, responsible: $responsible, studentDni: $studentDni){
          reserve{
              idReserve
          }
          responsible
          studentDni{
              dni
          }
      }
  }
  `;
    this.apollo.mutate<any>({
      mutation: createRole,
      variables: {
        reserveId: id,
        responsible: true,
        studentDni: this.dniResponsible
      }
    }).subscribe(({ data }) => {
    }, error => {
      console.log("create role: " + error);
    });

    for (let dni of this.arrayOthersDni) {
      if (dni !== undefined) {
        this.apollo.mutate<any>({
          mutation: createRole,
          variables: {
            reserveId: id,
            responsible: false,
            studentDni: dni
          }
        }).subscribe(({ data }) => {
        }, error => {
          console.log(error);
        });
      }
    }
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: `Done!`,
      duration: 1500
    });
    toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { Classroom } from '../interfaces/classroom';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Role } from '../interfaces/role';
import gql from 'graphql-tag';

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

  constructor(private apollo: Apollo, private router: Router) { }

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
    if (this.arrayOthersDni.length < 1) {
      this.arrayOthersDni[this.arrayOthersDni.length] = this.otherDni
    } else {
      this.arrayOthersDni[this.arrayOthersDni.length + 1] = this.otherDni
    }
  }

  async validateDni() {
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

  console.log(this.dniResponsible);
  
    const query = this.apollo.watchQuery<any>({
      query: getByDni,
      variables: {
        dni: this.dniResponsible
      }
    });

    query.valueChanges.subscribe(result => {
      if(result.data.getByDni === null){
        throw "Error";
      }
      console.log("bueno");
    }, error => {
      console.log("malo");

    });
  }

  //delete one by one elements in array of dni.
  async deleteOtherDni(deleteDni: String) {
    const result = this.arrayOthersDni.filter(data => data !== deleteDni);
    this.arrayOthersDni = result;
  }

  async loadStudentsWithResposible() {
    let arrayStudentDniWithResponsible: Array<Role> = [];

    //student that have the responsability.
    let studentDniWithResponsible: Role = {
      studentDni: this.dniResponsible,
      isResponsible: true
    };
    arrayStudentDniWithResponsible.push(studentDniWithResponsible);

    //student that don't have the responsability.
    for (let dni of this.arrayOthersDni) {
      let studentDniWithoutResponsible: Role = {
        studentDni: "",
        isResponsible: false
      };
      if (dni !== undefined) {
        studentDniWithoutResponsible.studentDni = dni;
        arrayStudentDniWithResponsible.push(studentDniWithoutResponsible)
      }
    }
  }

  async createReserveWithRole() {
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
      console.log(error);
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
}

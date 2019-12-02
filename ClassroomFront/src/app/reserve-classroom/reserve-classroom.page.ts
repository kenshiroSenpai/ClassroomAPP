import { Component, OnInit } from '@angular/core';
import { Classroom } from '../interfaces/classroom';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-reserve-classroom',
  templateUrl: './reserve-classroom.page.html',
  styleUrls: ['./reserve-classroom.page.scss'],
})
export class ReserveClassroomPage implements OnInit {

  classroomReserve: Classroom;
  startDate: String;
  startTime: String;
  endDate: String;
  endTime: String;


  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {

    if (this.router.getCurrentNavigation().extras.state) {
      this.classroomReserve = this.router.getCurrentNavigation().extras.state.classroomInfo;
    }
  }

  async createReserve() {
    const startDateFormat = this.startDate.split("T");
    const endDateFormat = this.startDate.split("T");
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
    this.apollo.mutate({
      mutation: createReserve,
      variables: {
        classroomNumber: this.classroomReserve.number,
        startTime: "2019-11-13 14:00",
        endTime: "2019-11-13 15:00"
      }
    }).subscribe(({ data }) => {
      console.log("se hizo");

    }, error => {
      console.log("SALIO MAL");

    })
  }

  show() {
    //const startDateFormat = this.startDate.split("T");
    console.log(this.startTime);

  }

}

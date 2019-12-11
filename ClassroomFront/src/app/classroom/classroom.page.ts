import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Classroom } from '../interfaces/classroom';
import { Router, NavigationExtras } from '@angular/router';
import gql from 'graphql-tag';
import { LocalDBService } from '../services/local-db.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {

  classrooms: Array<Classroom>;

  constructor(private apollo: Apollo, private router: Router,private localDb: LocalDBService) { }

  ngOnInit() {
    this.loadClassroom();
  }

  async loadLocalClassroom(){
    this.localDb.insertRow('classroom', this.classrooms)
  }

  async readClassroom(){
    this.localDb.getRows('classroom').subscribe(data =>{
      console.log(data);
    });
    //console.log(JSON.stringify(classroomPrueba));
    //this.readLog(classroomPrueba);
  }

  async readLog(algo: any){
    
    //console.log(JSON.stringify(this.localDb.getRows('classroom')));
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
    });

    query.valueChanges.subscribe((result) =>{
      this.classrooms = result.data.getAllClassroom;
      this.localDb.createClassroom();
      this.loadLocalClassroom();
    },
      error => {
      });
  }

  async goToClassroom(classroom: Classroom){
    let navigationExtras: NavigationExtras = {
      state:{
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

}

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ToastController } from '@ionic/angular';
import { LocalDBService } from '../services/local-db.service';
import { Classroom } from '../interfaces/classroom';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.page.html',
  styleUrls: ['./create-classroom.page.scss'],
})
export class CreateClassroomPage implements OnInit {

  formClassroom: FormGroup;

  constructor(private formBuilder: FormBuilder, private apollo:Apollo,
     private router: Router, private toastController: ToastController,
     private localDb: LocalDBService) {

    this.formClassroom = this.formBuilder.group({
      number: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]*'), Validators.required])],
      building: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  async createClassroom(){
    const createClassroom = gql`
    mutation createClassroom($number: ID!, $building: String!){
      createClassroom(number: $number, building: $building){
          number
          building
      }
  }
  `;
    this.apollo.mutate<any>({
      mutation: createClassroom,
      variables: {
        number: this.getNumber(),
        building: this.getBuilding()
      }
    }).subscribe(({ data }) => {
      console.log(data.createClassroom);
      this.localDb.insertRow('classroom', data.createClassroom)
      this.router.navigate(['/classroom']);
      this.presentToast(`Your created ${this.getNumber()}` + ` ${this.getBuilding()}`);
    }, error => {
      console.log(error);
    });
  }

  getNumber(){
    return this.formClassroom.value['number'];
  }

  getBuilding(){
    return this.formClassroom.value['building'];
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

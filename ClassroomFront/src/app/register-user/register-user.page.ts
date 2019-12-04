import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphQLModule } from '../graphql.module'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage {

  formRegister: FormGroup;
  name: String;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private graphQL: GraphQLModule, private toastController: ToastController, private router: Router) {

    this.formRegister = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-z]+'), Validators.required])],
      username: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-z]+'), Validators.required])],
      firstSurname: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-z]+'), Validators.required])],
      secondSurname: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-z]+')])],
      dni: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[0-9]{8}[a-zA-z]{1}'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(16), Validators.required])],
      confirmPassword: ['', Validators.required]
    },
      { validators: this.matchingPasswords('password', 'confirmPassword') });
  }

  async validateStudent() {
    this.graphQL.configRegister();
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
        dni: this.getDni()
      }
    });

    query.valueChanges.subscribe(result => {
      console.log(result.data.getByDni);

      if (result.data.getByDni !== null) {
        this.createUser()
      } else {
        this.presentToastFail();
        throw "Student not found";
      }
    }, error => {
      console.log(error);

    });
  }

  async createUser() {
    const createUser = gql`
    mutation createUser($username: ID!, $password: String!, $privileges: String!, $studentsDni: String!){
      createUser(username: $username, password: $password, privileges: $privileges, studentsDni: $studentsDni){
        username
        password
        privileges
        studentsDni{
            dni
        }
      }
  }
  `;

    this.apollo.mutate<any>({
      mutation: createUser,
      variables: {
        username: this.getUsername().toLowerCase(),
        password: this.getPassword(),
        privileges: "",
        studentsDni: this.getDni()
      }
    }).subscribe(({ data }) => {
      this.presentToastSuccess();
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
    });

  }

  //Toast Controllers
  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: `Created correctly!`,
      duration: 2000
    });
    toast.present();
  }

  async presentToastFail() {
    const toast = await this.toastController.create({
      message: `Student not found`,
      duration: 2500
    });
    toast.present();
  }
  //-------------------------------------------------

  // password validator.
  private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  //Getters value from html
  getName() {
    return this.formRegister.value['name'];
  }

  getUsername() {
    return this.formRegister.value['username'];
  }

  getFirstSurname() {
    return this.formRegister.value['firstSurname'];
  }

  getSecondSurname() {
    return this.formRegister.value['secondSurname'];
  }

  getDni() {
    return this.formRegister.value['dni'];
  }

  getPassword() {
    return this.formRegister.value['password'];
  }
  // ------------------------------------------------

}

import { Component, OnInit } from '@angular/core';
//Apollo with GraphQL
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { GraphQLModule } from '../graphql.module'
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  login: Boolean;
  formLogin: FormGroup;

  constructor(private apollo: Apollo, private graphQLModule: GraphQLModule, private router: Router, private toastController: ToastController, private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-z]+[0-9]*'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(16), Validators.required])],
    });
   }

  ngOnInit() {
  }

  async loginUser() {
    
    let isLogin: any;
    this.graphQLModule.user.username = this.getUsername().toLowerCase();
    this.graphQLModule.user.password = this.getPassword();
    this.graphQLModule.config();

    const login = gql`
    {
      login
    }
  `;
    const query = this.apollo.watchQuery<any>({
      query: login,
    });

    query.valueChanges.subscribe(result => {
      isLogin = result.data.login;
      this.router.navigate(['/home']);
      this.presentToast(`Welcome ${this.username.toLowerCase()}`);   
      this.formLogin.setValue({
        username: "",
        password: ""
      });
    },
    error =>{
    isLogin = false;
    this.presentToast(`Bad username or password, please try again.`);
    });
    return isLogin;
  }

  async registerUser(){
    this.router.navigate(['/register-user']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getUsername() {
    return this.formLogin.value['username'];
  }

  getPassword() {
    return this.formLogin.value['password'];
  }

}
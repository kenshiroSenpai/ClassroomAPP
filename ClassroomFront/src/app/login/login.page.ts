import { Component, OnInit } from '@angular/core';
//Apollo with GraphQL
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { GraphQLModule } from '../graphql.module'
import { Router } from '@angular/router';
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

  constructor(private apollo: Apollo, private graphQLModule: GraphQLModule, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async loginUser() {
    
    let isLogin: any;
    this.graphQLModule.user.username = this.username.toLowerCase();
    this.graphQLModule.user.password = this.password
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
      this.presentToastSuccess();   
      this.username = "";
      this.password = "";
    },
    error =>{
    isLogin = false;
    this.presentToastFail();
    });
    return isLogin;
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: `Welcome ${this.username.toLowerCase()}`,
      duration: 2000
    });
    toast.present();
  }

  async presentToastFail() {
    const toast = await this.toastController.create({
      message: `Bad username or password, please try again.`,
      duration: 2000
    });
    toast.present();
  }

}
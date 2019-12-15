import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GraphQLModule } from '../graphql.module';
import { Users } from '../interfaces/users';
import { MenuController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { LocalDBService } from '../services/local-db.service';
import gql from 'graphql-tag';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo: Users;
  user: Users;

  constructor(private router: Router, private graphQLModule: GraphQLModule,
    private menuController: MenuController, private apollo: Apollo,
    private localDb: LocalDBService) { }

  ngOnInit() {
  }

  async goToShowClassroom() {
    let navigationExtras: NavigationExtras = {
      state: {
        userInfo: this.user
      }
    }
    this.router.navigate(['/classroom'], navigationExtras);
  }

  async goToMyReserve() {
    this.userInfo = this.graphQLModule.user;
    let navigationExtras: NavigationExtras = {
      state: {
        userInfo: this.userInfo
      }
    }
    this.router.navigate(['/my-reserve'], navigationExtras);
  }

  async goToLogin() {
    this.menuController.close('myMenu');
    this.router.navigate(['/login']);
  }

  async goToUserInfo() {
    this.menuController.close('myMenu');
    this.userInfo = this.graphQLModule.user;
    let navigationExtras: NavigationExtras = {
      state: {
        userInfo: this.userInfo
      }
    }
    this.router.navigate(['/user-info'], navigationExtras);
  }

  async getUser() {
    this.userInfo = this.graphQLModule.user;
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
      variables: {
        username: this.userInfo.username
      }
    });
    query.valueChanges.subscribe(data => {
      this.user = data.data.getUser;
      this.goToShowClassroom();
    });
  }
}

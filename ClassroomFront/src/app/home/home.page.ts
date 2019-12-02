import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GraphQLModule } from '../graphql.module';
import { Users } from '../interfaces/users';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userInfo: Users;

  constructor(private router: Router, private graphQLModule: GraphQLModule,) {}
  
  async goToShowClassroom(){
    this.router.navigate(['/classroom']);
  }

  async goToMyReserve(){
    this.router.navigate(['/my-reserve']);
  }

  async goToLogin(){
    this.router.navigate(['/login']);
  }

  async goToUserInfo(){
    this.userInfo = this.graphQLModule.user;
    let navigationExtras: NavigationExtras = {
      state:{
        userInfo: this.userInfo
      }
    }
    this.router.navigate(['/user-info'], navigationExtras);
  }

}

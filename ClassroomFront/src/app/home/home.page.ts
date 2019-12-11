import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GraphQLModule } from '../graphql.module';
import { Users } from '../interfaces/users';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo: Users;

  constructor(private router: Router, private graphQLModule: GraphQLModule, private menuController: MenuController) { }

  ngOnInit() {
  }

  openFirst() { 
    this.menuController.open('myMenu');
  }

  async goToShowClassroom() {
    this.router.navigate(['/classroom']);
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

}

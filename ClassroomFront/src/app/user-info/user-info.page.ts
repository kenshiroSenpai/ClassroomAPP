import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  private username: String;
  user: Users = {
    username: "",
    password: "",
    privileges: "",
    studentsDni: null
  };

  constructor(private router: Router, private apollo: Apollo) { }

  async ngOnInit() {
    document.getElementById("showUsers").style.display = 'none';
    this.loadData();
  }

  async loadData() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.username = this.router.getCurrentNavigation().extras.state.userInfo.username;
    }

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
        username: this.username
      }
    });
    query.valueChanges.subscribe(result => {
      this.user = result.data.getUser;
      if (this.user.privileges === "ROLE_ADMIN") {
        document.getElementById("showUsers").style.display = 'block';
      }
    });
  }

  async goToAdminUser(){
    this.router.navigate(['admin-user']);
  }
}

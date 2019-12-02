import { Component, OnInit } from '@angular/core';
import { Users } from '../interfaces/users';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.page.html',
  styleUrls: ['./admin-user.page.scss'],
})
export class AdminUserPage implements OnInit {

  users: Array<Users>;
  dni: String;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {

    const getAllUsers = gql`
    {
      getAllUsers{
      username
      password
      privileges
      studentsDni{
        dni
        }
      }
    }
    `;

    const query = this.apollo.watchQuery<any>({
      query: getAllUsers
    });
    query.valueChanges.subscribe(result =>{
      this.users = result.data.getAllUsers;
    }, error =>{
      console.log(error);
    });
  }



}

import { NgModule } from "@angular/core";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Users } from './interfaces/users'

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})

export class GraphQLModule {

  user: Users = {
    username: "",
    password: "",
    privileges: "",
    studentsDni: null
  }
  private header: HttpHeaders;

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
  }

  async config() {

    this.header = new HttpHeaders();
    this.header = this.header.append("Authorization", "Basic " + btoa(this.user.username + ":" + this.user.password));
    this.header = this.header.append("Content-Type", "application/json");

    this.apollo.removeClient();
    this.apollo.create({
      link: this.httpLink.create({
        uri: "http://localhost:8080/graphql",
        headers: this.header
      }),

      cache: new InMemoryCache()
    });
  }

  async configRegister() {
    this.apollo.removeClient();
    this.apollo.create({
      link: this.httpLink.create({
        uri: "http://localhost:8080/graphql"
      }),

      cache: new InMemoryCache()
    });
  }

}
# ClassroomAPP

**ClassroomAPP**  is an application to make reservations in the classroom. 
You can see the classrooms, make the reservation of the classroom you want and cancel it at any time.

#### ClassroomBack: This folder contain the back-end of the ClassroomAPP. It is made with Java with the framework Spring and GraphQL. 
#### ClassroomFront: This folder contain the front-end.It is made with Ionic/Angular.

# Requirements

You need Ionic 5, Cordova, PostgreSQL 12 with pgAdmin 4, Spring boot, preferably with Eclipse, 
Java 11 for Spring boot and Java 1.8 to build the app in the mobile.

# Getting Started

First, You need to write this command in the directory:
**_npm install_**

Later, you need open pgAdmin 4 with postgreSQL 12, create a new database and click in **_Restore_** 
and use the backup that have this project with demo data.

the next step would be to open eclipse with the ClassroomBack project and run it.

**Important!**, you need change ip in the *_application.properties_* file in ClassroomBack and graphql.module.ts file in ClassroomFront.

# Acknowledgments
Spring:[Spring](https://spring.io/guides)

Ionic:[Ionic](https://ionicframework.com/docs)

PostgreSQL: [PostgreSQL](https://www.postgresql.org)

GraphQL: [GraphQL](https://graphql.org/learn/)

Postman:[Postman](https://documenter.getpostman.com/view/8800418/SW7c2Sg4)

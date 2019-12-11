import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Classroom } from '../interfaces/classroom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {

  private database: SQLiteObject;

  rowData: any = [];

  constructor(private platform: Platform, private sql: SQLite) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    });
  }

  createDB() {
    this.sql.create({
      name: 'ClassroomDB',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      console.log("se creó la db");
    }).catch(error => {
      console.log("db: " + error);
    });
  }

  createClassroom() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS classroom(' +
      'number BIGINT PRIMARY KEY,' +
      'building VARCHAR(255))', []).then(() => {
        console.log("se creo la tabla classroom");
      }).catch(error => {
        console.log("table classroom: " + JSON.stringify(error));
      });
  }

  insertRow(tableName: String, classroomArray: Array<Classroom>) {
    for (let classroom of classroomArray) {
      console.log("entro " + JSON.stringify(classroom));

      this.database.executeSql('INSERT OR IGNORE INTO ' + tableName + ' VALUES ("' + classroom.number + '", "' + classroom.building + '")', [])
        .then(() => {
          console.log("insertado el valor " + JSON.stringify(classroom) + "en la tabla " + tableName);
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
  }

  getRows(tableName: String): Observable<any> {
    return new Observable(observe =>{
      this.database.executeSql("SELECT * FROM " + tableName, [])
      .then((res) => {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.rowData.push(res.rows.item(i));
          }
        }
        console.log(JSON.stringify(this.rowData));
        observe.next(this.rowData);
        observe.complete();
      })
      .catch(e => {
        observe.error(JSON.stringify(e));
      });
    })
  }
}
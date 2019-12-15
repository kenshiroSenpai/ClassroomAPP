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
      this.createPictures();
      console.log("se creó la db");
    }).catch(error => {
      console.log("db: " + error);
    });
  }

  createClassroom() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS classroom(' +
      'number BIGINT PRIMARY KEY,' +
      'building VARCHAR(255) NOT NULL)', []).then(() => {
        console.log("se creo la tabla classroom");
      }).catch(error => {
        console.log("table classroom: " + JSON.stringify(error));
      });
  }

  createPictures() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS pictures(' +
      'registry INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'path VARCHAR(255) NOT NULL)', []).then(() => {
        console.log("se creo la tabla pictures");
        this.insertImage();
      }).catch(error => {
        console.log("table classroom: " + JSON.stringify(error));
      });
  }

  insertImage() {
    console.log("Se inserto el valor");
    this.database.executeSql('INSERT OR REPLACE INTO  pictures (path) VALUES ("../../assets/img/prueba.png")', [])
  }

  readPicture(index: string): Observable<any> {
    return new Observable(observe => {
      this.database.executeSql("SELECT * FROM pictures WHERE registry= " + index, [])
        .then((res) => {
          console.log(res.rows.item(0).path);
          observe.next(res.rows.item(0).path);
          observe.complete();
        })
        .catch(e => {
          observe.error(JSON.stringify(e));
        });
    })
  }

  insertRows(tableName: string, classroomArray: Array<Classroom>) {
    for (let classroom of classroomArray) {
      this.database.executeSql('INSERT OR REPLACE INTO ' + tableName + '(number, building) VALUES ("' + classroom.number + '", "' + classroom.building + '")', [])
        .then(() => {
          console.log("insertado el valor " + JSON.stringify(classroom) + "en la tabla " + tableName);
        })
        .catch(e => {
        });
    }
  }

  insertRow(tableName: String, classroom: Classroom) {
    this.database.executeSql('INSERT OR REPLACE INTO ' + tableName + ' VALUES ("' + classroom.number + '", "' + classroom.building + '")', [])
      .then(() => {
        console.log("insertado el valor " + JSON.stringify(classroom) + "en la tabla " + tableName);
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  getRows(tableName: String): Observable<any> {
    let rowData: any = [];
    return new Observable(observe => {
      this.database.executeSql("SELECT * FROM " + tableName, [])
        .then((res) => {
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              rowData.push(res.rows.item(i));
            }
          }
          console.log(JSON.stringify(rowData));
          observe.next(rowData);
          observe.complete();
        })
        .catch(e => {
          observe.error(JSON.stringify(e));
        });
    })
  }

  deleteRow(tableName: string, item: string) {
    console.log(item);
    this.database.executeSql("DELETE FROM " + tableName + " WHERE number = " + item, [])
      .then((res) => {
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
}

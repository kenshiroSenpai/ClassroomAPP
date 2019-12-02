import{Students } from './students';

export interface Users {
    username: string;
    password: string;
    privileges: String;
    studentsDni: Students
  }
import { Reservation } from './reservation';

export interface Role {
    reserve: Reservation
    studentDni:String,
    isResponsible: Boolean
  }
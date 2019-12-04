import { Classroom } from './classroom';

export interface Reservation {
	idReserve: String,
	classroomNumber: Classroom,
	startTime: String,
	endTime: String
}
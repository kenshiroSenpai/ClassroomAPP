package com.kenshiro.classroom.entity.services;

import java.util.Optional;
import com.kenshiro.classroom.entity.models.Reservation;

public interface IReservationService {
	
	public Iterable<Reservation> getAllReservation();
	public Optional<Reservation> getReserve(long dni);
	public Reservation createReserve(long classroomNumber, String startTime, String endTime);
	public Optional<Reservation> updateReserve(long idReserve, long classroomNumber, String startTime, String endTime);
	public boolean deleteReserve(long idReserve);

}

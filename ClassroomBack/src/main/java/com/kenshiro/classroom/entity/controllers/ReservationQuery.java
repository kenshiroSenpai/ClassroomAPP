package com.kenshiro.classroom.entity.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.services.ReservationService;

@Component
public class ReservationQuery implements GraphQLQueryResolver{
	
	@Autowired
	private ReservationService reservationService;
	
	@Transactional(readOnly = true)
	public Iterable<Reservation> getAllReservation(){
		return reservationService.getAllReservation();
	}
	
	@Transactional(readOnly = true)
	public Optional<Reservation> getReserve(final long id){
		return reservationService.getReserve(id);
	}

}

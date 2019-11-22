package com.kenshiro.classroom.entity.controllers;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.services.ReservationService;

@Component
public class ReservationMutation implements GraphQLMutationResolver{
	
	@Autowired
	private ReservationService reservationService;
	
	@Transactional
	public Reservation createReserve(long classroomNumber, String startTime, String endTime) {
		return reservationService.createReserve(classroomNumber, startTime, endTime);
	}
	@Transactional
	public Optional<Reservation> updateReserve(long idReserve,long classroomNumber, String startTime, String endTime){
		return reservationService.updateReserve(idReserve, classroomNumber, startTime, endTime);
	}
	@Transactional
	public boolean deleteReserve(long idReserve) {
		return reservationService.deleteReserve(idReserve);
	}

}

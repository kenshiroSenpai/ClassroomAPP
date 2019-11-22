package com.kenshiro.classroom.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.kenshiro.classroom.entity.models.Reservation;

public interface IReservationDao extends CrudRepository<Reservation, Long>{

}

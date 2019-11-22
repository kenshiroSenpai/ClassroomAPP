package com.kenshiro.classroom.entity.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import com.kenshiro.classroom.entity.dao.IClassroomDao;
import com.kenshiro.classroom.entity.dao.IReservationDao;
import com.kenshiro.classroom.entity.models.Reservation;

@Service
public class ReservationService implements IReservationService {

	@Autowired
	private IReservationDao reservationDao;

	@Autowired
	private IClassroomDao classroomDao;

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Reservation> getAllReservation() {
		return reservationDao.findAll();
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Optional<Reservation> getReserve(long id) {
		return reservationDao.findById(id);
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Reservation createReserve(long classroomNumber, String startTime, String endTime) {
		Reservation reservation = new Reservation();
		classroomDao.findById(classroomNumber).ifPresent(classroomFound -> {
			reservation.setClassroomNumber(classroomFound);
			Date dateStart;
			try {
				System.out.println(startTime);
				dateStart = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(startTime);
				System.out.println(dateStart.toString());
				reservation.setStartTime(dateStart);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Date dateEnd;
			try {
				dateEnd = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(endTime);
				reservation.setEndTime(dateEnd);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		});
		return reservationDao.save(reservation);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Optional<Reservation> updateReserve(long idReserve, long classroomNumber, String startTime, String endTime) {
		Optional<Reservation> reservation = reservationDao.findById(idReserve);
		reservation.ifPresent(reservationFound -> {
			Date dateStart;
			try {
				dateStart = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(startTime);
				reservationFound.setStartTime(dateStart);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Date dateEnd;
			try {
				dateEnd = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(endTime);
				reservationFound.setEndTime(dateEnd);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			classroomDao.findById(classroomNumber).ifPresent((classroomFound) -> {
				reservationFound.setClassroomNumber(classroomFound);
			});
			reservationDao.save(reservationFound);
		});
		return reservation;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteReserve(long idReserve) {
		try {
			reservationDao.deleteById(idReserve);
		} catch (IllegalArgumentException e) {
			return false;
		}
		return true;
	}

}

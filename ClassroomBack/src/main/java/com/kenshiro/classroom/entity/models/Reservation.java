package com.kenshiro.classroom.entity.models;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode
@Table(name = "reservation", schema = "classroomSchema")
public class Reservation implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_reserve")
	private long idReserve;

	@ManyToOne
	@JoinColumn(name="classroom_number", nullable = false)
	private Classroom classroomNumber;
	
	@OneToMany(mappedBy = "reserve")
	private Set<Role> reservation = new HashSet<Role>();
	
	@Column(name="start_time", nullable = false)
	private Date startTime;
	
	@Column(name="end_time", nullable = false)
	private Date endTime;
	
	public Reservation() {}

	public Reservation(long idReserve, Classroom classroomNumber, Set<Role> reservation, Date startTime, Date endTime) {
		super();
		this.idReserve = idReserve;
		this.classroomNumber = classroomNumber;
		this.reservation = reservation;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	public long getIdReserve() {
		return idReserve;
	}

	public void setIdReserve(long idReserve) {
		this.idReserve = idReserve;
	}

	public Classroom getClassroomNumber() {
		return classroomNumber;
	}

	public void setClassroomNumber(Classroom classroomNumber) {
		this.classroomNumber = classroomNumber;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Set<Role> getReservation() {
		return reservation;
	}

	public void setReservation(Set<Role> reservation) {
		this.reservation = reservation;
	}
	
}

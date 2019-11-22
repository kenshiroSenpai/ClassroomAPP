package com.kenshiro.classroom.entity.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode
@Table(name = "classroom", schema = "classroomSchema")
public class Classroom implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "number", nullable = false)
	private long number;

	@Column(name = "building", nullable = false)
	private String building;
	
	@OneToMany(mappedBy= "classroomNumber")
	private Set<Reservation> reserveClassroom = new HashSet<Reservation>();

	public Classroom() {
	}

	public Classroom(long number, String building, Set<Reservation> reservation) {
		super();
		this.number = number;
		this.building = building;
		this.reserveClassroom = reservation;
	}

	public long getNumber() {
		return number;
	}

	public void setNumber(long number) {
		this.number = number;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public Set<Reservation> getReservation() {
		return reserveClassroom;
	}

	public void setReservation(Set<Reservation> reservation) {
		this.reserveClassroom = reservation;
	}

}

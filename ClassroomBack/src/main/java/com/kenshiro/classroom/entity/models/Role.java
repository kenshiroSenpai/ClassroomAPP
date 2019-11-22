package com.kenshiro.classroom.entity.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode
@Table(name = "role", schema = "classroomSchema")
public class Role implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private RoleKey id;
	
	@ManyToOne
	@MapsId("reserve")
	@JoinColumn(name="reserve", nullable = false)
	private Reservation reserve;
	
	@Column(name="responsible", nullable = false)
	private boolean responsible;
	
	@ManyToOne
	@MapsId("student_dni")
	@JoinColumn(name="student_dni", nullable = false)
	private Students studentDni;
	
	public Role() {}

	public Role(RoleKey id, Reservation reserve, boolean responsible, Students studentDni) {
		super();
		this.id = id;
		this.reserve = reserve;
		this.responsible = responsible;
		this.studentDni = studentDni;
	}

	public Reservation getReserve() {
		return reserve;
	}

	public void setReserve(Reservation reserve) {
		this.reserve = reserve;
	}

	public boolean isResponsible() {
		return responsible;
	}

	public void setResponsible(boolean responsible) {
		this.responsible = responsible;
	}

	public Students getStudentDni() {
		return studentDni;
	}

	public void setStudentDni(Students studentDni) {
		this.studentDni = studentDni;
	}

	public RoleKey getId() {
		return id;
	}

	public void setId(RoleKey id) {
		this.id = id;
	}
	
}

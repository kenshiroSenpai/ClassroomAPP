package com.kenshiro.classroom.entity.models;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode
@Table(name = "students", schema = "classroomSchema")
public class Students implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="dni", nullable=false)
	private String dni;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "first_surname", nullable = false)
	private String firstSurname;
	
	@Column(name = "second_surname")
	private String secondSurname;
	
	@Column(name = "date_of_birth", nullable = false)
	private Date dateOfBirth;
	
	@Column(name = "reserve_classroom", nullable = false)
	private boolean reserveClassroom;
	
	@OneToMany(mappedBy = "studentDni")
	private Set<Role> studentDni = new HashSet<Role>();
	
	@OneToOne(mappedBy = "studentsDni")
	private Users user;
	
	public Students() {}

	public Students(String dni, String name, String firstSurname, String secondSurname, Date dateOfBirth,
			boolean reserveClassroom, Set<Role> studentDni, Users user) {
		super();
		this.dni = dni;
		this.name = name;
		this.firstSurname = firstSurname;
		this.secondSurname = secondSurname;
		this.dateOfBirth = dateOfBirth;
		this.reserveClassroom = reserveClassroom;
		this.studentDni = studentDni;
		this.user = user;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFirstSurname() {
		return firstSurname;
	}

	public void setFirstSurname(String firstSurname) {
		this.firstSurname = firstSurname;
	}

	public String getSecondSurname() {
		return secondSurname;
	}

	public void setSecondSurname(String surname2) {
		this.secondSurname = surname2;
	}

	public boolean isReserveClassroom() {
		return reserveClassroom;
	}

	public void setReserveClassroom(boolean reserveClassroom) {
		this.reserveClassroom = reserveClassroom;
	}
	
	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Set<Role> getStudentDni() {
		return studentDni;
	}

	public void setStudentDni(Set<Role> studentDni) {
		this.studentDni = studentDni;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}
	
}

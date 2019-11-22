package com.kenshiro.classroom.entity.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode
@Table(name = "users", schema = "classroomSchema")
public class Users implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="username", nullable=false)
	private String username;
	
	@Column(name="password", nullable=false)
	private String password;
	
	@Column(name="privileges", nullable=false)
	private String privileges;
	
	@OneToOne
	@JoinColumn(name="students_dni", referencedColumnName = "dni")
	private Students studentsDni;
	
	public Users() {}

	public Users(String username, String password, String privileges, Students studentsDni) {
		super();
		this.username = username;
		this.password = password;
		this.privileges = "ROLE_" + privileges;
		this.studentsDni = studentsDni;
	}

	public String getUser() {
		return username;
	}

	public void setUser(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPrivileges() {
		return privileges;
	}

	public void setPrivileges(String privileges) {
		this.privileges = "ROLE_" + privileges;
	}

	public Students getStudentsDni() {
		return studentsDni;
	}

	public void setStudentsDni(Students studentsDni) {
		this.studentsDni = studentsDni;
	}
	
}

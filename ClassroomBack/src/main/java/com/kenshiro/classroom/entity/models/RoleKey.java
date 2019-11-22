package com.kenshiro.classroom.entity.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class RoleKey implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(name = "reserve")
	private long reserve;
	
	@Column(name = "student_dni")
	private String studentDni;
	
	public RoleKey() {}
	
	public RoleKey(long reserve, String studentDni) {
		super();
		this.reserve = reserve;
		this.studentDni = studentDni;
	}

	public long getReserve() {
		return reserve;
	}

	public void setReserve(long reserve) {
		this.reserve = reserve;
	}

	public String getStudentDni() {
		return studentDni;
	}

	public void setStudentDni(String studentDni) {
		this.studentDni = studentDni;
	}

}

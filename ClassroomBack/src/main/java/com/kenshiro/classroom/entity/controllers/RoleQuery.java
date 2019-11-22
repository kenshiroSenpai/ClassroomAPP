package com.kenshiro.classroom.entity.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.models.Role;
import com.kenshiro.classroom.entity.models.Students;
import com.kenshiro.classroom.entity.services.RoleService;

@Component
public class RoleQuery implements GraphQLQueryResolver {

	@Autowired
	private RoleService roleService;

	@Transactional(readOnly = true)
	public Iterable<Role> getAllRole() {
		return roleService.getAllRole();
	}

	@Transactional(readOnly = true)
	public Iterable<Role> getRoleWithReserve(long reserveId) {
		Reservation reservation = new Reservation();
		reservation.setIdReserve(reserveId);
		return roleService.getRoleWithReserve(reservation);
	}

	@Transactional(readOnly = true)
	public Iterable<Role> getRoleWithDni(String studentDni) {
		Students student = new Students();		
		student.setDni(studentDni);
		return roleService.getRoleWithDni(student);
	}

}

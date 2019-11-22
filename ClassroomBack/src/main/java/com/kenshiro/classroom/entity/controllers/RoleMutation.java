package com.kenshiro.classroom.entity.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.models.Role;
import com.kenshiro.classroom.entity.models.Students;
import com.kenshiro.classroom.entity.services.RoleService;

@Component
public class RoleMutation implements GraphQLMutationResolver{

	@Autowired
	private RoleService roleService;
	
	@Transactional
	public Role createRole(long reserveId, boolean responsible, String studentDni) {
		return roleService.createRole(reserveId, responsible, studentDni);
	}
	@Transactional
	public boolean deleteRoleByDni(String studentDni) {
		Students dni = new Students();
		dni.setDni(studentDni);
		return roleService.deleteRoleByDni(dni);
	}
	@Transactional
	public boolean deleteRoleByReserve(long reserveId) {
		Reservation reserve = new Reservation();
		reserve.setIdReserve(reserveId);
		return roleService.deleteRoleByReserve(reserve);
	}
}

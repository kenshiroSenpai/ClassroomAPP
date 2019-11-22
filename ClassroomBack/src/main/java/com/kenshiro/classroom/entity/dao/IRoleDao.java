package com.kenshiro.classroom.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.models.Role;
import com.kenshiro.classroom.entity.models.RoleKey;
import com.kenshiro.classroom.entity.models.Students;

public interface IRoleDao extends CrudRepository<Role, RoleKey>{
	public Iterable<Role> findByReserve(Reservation reserve);
	public Iterable<Role> findByStudentDni(Students studentDni);
	
}

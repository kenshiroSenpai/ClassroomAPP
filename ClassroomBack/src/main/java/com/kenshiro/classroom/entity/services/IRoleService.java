package com.kenshiro.classroom.entity.services;



import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.models.Role;
import com.kenshiro.classroom.entity.models.Students;

public interface IRoleService {
	
	public Iterable<Role> getAllRole();
	public Iterable<Role> getRoleWithReserve(Reservation reserveId);
	public Iterable<Role> getRoleWithDni(Students studentDni);
	public Role createRole(long reserveId, boolean responsible, String studentDni);
	public boolean deleteRoleByDni(Students studentDni);
	public boolean deleteRoleByReserve(Reservation reserveId);
}

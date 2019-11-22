package com.kenshiro.classroom.entity.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.kenshiro.classroom.entity.dao.IReservationDao;
import com.kenshiro.classroom.entity.dao.IRoleDao;
import com.kenshiro.classroom.entity.dao.IStudentsDao;
import com.kenshiro.classroom.entity.models.Reservation;
import com.kenshiro.classroom.entity.models.Role;
import com.kenshiro.classroom.entity.models.RoleKey;
import com.kenshiro.classroom.entity.models.Students;

@Service
public class RoleService implements IRoleService{
	
	@Autowired
	private IRoleDao roleDao;
	
	@Autowired
	private IStudentsDao studentDao;
	
	@Autowired
	private IReservationDao reservationDao;
	
	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Role> getAllRole() {
		return roleDao.findAll();
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Role> getRoleWithReserve(Reservation reserveId) {
		return roleDao.findByReserve(reserveId);
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Role> getRoleWithDni(Students studentDni) {
		return roleDao.findByStudentDni(studentDni);
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Role createRole(long reserveId, boolean responsible, String studentDni) {
		Role role = new Role();
		RoleKey roleKey = new RoleKey();
		reservationDao.findById(reserveId).ifPresent(reserveFound ->{
			studentDao.findById(studentDni).ifPresent(studentDniFound ->{
				role.setReserve(reserveFound);
				role.setResponsible(responsible);
				role.setStudentDni(studentDniFound);
				roleKey.setReserve(reserveId);
				roleKey.setStudentDni(studentDni);
				role.setId(roleKey);
			});
		});
		return roleDao.save(role);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteRoleByDni(Students studentDni) {
		final List<Role> role = (List<Role>)roleDao.findByStudentDni(studentDni);
		if(role.size()>0) {
			roleDao.deleteAll(role);
			return true;
		}else {
			System.out.println("Empty");
		}
		return false;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteRoleByReserve(Reservation reserveId) {
		final List<Role> role = (List<Role>)roleDao.findByReserve(reserveId);
		if(role.size()>0) {
			roleDao.deleteAll(role);
			return true;
		}else {
			System.out.println("Empty");
		}
		return false;
	}
}

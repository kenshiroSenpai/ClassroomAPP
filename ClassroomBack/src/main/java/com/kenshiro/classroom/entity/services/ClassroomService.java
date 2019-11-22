package com.kenshiro.classroom.entity.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import com.kenshiro.classroom.entity.dao.IClassroomDao;
import com.kenshiro.classroom.entity.models.Classroom;

@Service
public class ClassroomService implements IClassroomService{
	
	@Autowired
	private IClassroomDao classroomDao;
	
	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Classroom> getAllClassroom() {
		return classroomDao.findAll();
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Optional<Classroom> getByNumber(long number) {
		return classroomDao.findById(number);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Classroom createClassroom(long number, String building) {
		Classroom classroom = new Classroom();
		classroom.setNumber(number);
		classroom.setBuilding(building);
		return classroomDao.save(classroom);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteClassroom(long number) {
		try {
			classroomDao.deleteById(number);
		} catch (IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Optional<Classroom> updateClassroom(long number, String building) {
		Optional<Classroom> classroom = classroomDao.findById(number);
		classroom.ifPresent(classroomFound ->{
			classroomFound.setBuilding(building);
			classroomDao.save(classroomFound);
		});
		return classroom;
	}

}

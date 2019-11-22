package com.kenshiro.classroom.entity.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import com.kenshiro.classroom.entity.dao.IStudentsDao;
import com.kenshiro.classroom.entity.models.Students;

@Service
public class StudentsService implements IStudentsService{
	
	@Autowired
	private IStudentsDao studentsDao;

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Students> getAllStudents() {
		return studentsDao.findAll();
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Optional<Students> getByDni(String dni) {
		return studentsDao.findById(dni);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteStudent(String dni) {
		try {
			studentsDao.deleteById(dni);
		} catch (IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Students createStudent(String dni, String name, String firstSurname, String secondSurname, boolean reserveClassroom,
			String dateOfBirth) {
		Students student = new Students();
		student.setDni(dni);
		student.setName(name);
		student.setFirstSurname(firstSurname);
		student.setSecondSurname(secondSurname);
		student.setReserveClassroom(reserveClassroom);
		Date date;
		try {
			date = new SimpleDateFormat("yyyy-MM-dd").parse(dateOfBirth);
			student.setDateOfBirth(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return studentsDao.save(student);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Optional<Students> updateStudent(String dni, String name, String firstSurname, String secondSurname,
			boolean reserveClassroom, String dateOfBirth) {
		Optional<Students> student = studentsDao.findById(dni);
		student.ifPresent(studentFound ->{
			studentFound.setName(name);
			studentFound.setFirstSurname(firstSurname);
			studentFound.setSecondSurname(secondSurname);
			studentFound.setReserveClassroom(reserveClassroom);
			Date date;
			try {
				date = new SimpleDateFormat("yyyy-MM-dd").parse(dateOfBirth);
				studentFound.setDateOfBirth(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			studentsDao.save(studentFound);
		});
		return student;
	}

}

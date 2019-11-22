package com.kenshiro.classroom.entity.services;

import java.util.Optional;
import com.kenshiro.classroom.entity.models.Students;

public interface IStudentsService {
	
	public Iterable<Students> getAllStudents();
	public Optional<Students> getByDni(String dni);
	public Students createStudent(String dni, String name, String firstSurname, String secondSurname, boolean reserveClassroom, String dateOfBirth);
	public boolean deleteStudent(String dni);
	public Optional<Students> updateStudent(String dni, String name, String firstSurname, String secondSurname, boolean reserveClassroom, String dateOfBirth);

}

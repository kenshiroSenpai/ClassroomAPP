package com.kenshiro.classroom.entity.controllers;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.kenshiro.classroom.entity.models.Students;
import com.kenshiro.classroom.entity.services.StudentsService;

@Component
public class StudentsMutation implements GraphQLMutationResolver{
	
	@Autowired
	private StudentsService studentService;
	
	@Transactional
	public Students createStudent(final String dni, final String name, final String surname1, 
			final String surname2, final boolean reserveClassroom, final String dateOfBirth) {
		return studentService.createStudent(dni, name, surname1, surname2, reserveClassroom, dateOfBirth);
	}
	
	@Transactional
	public boolean deleteStudent(final String dni) {
		return studentService.deleteStudent(dni);
	}
	
	@Transactional
	public Optional<Students> updateStudent(final String dni, final String name, final String surname1, 
			final String surname2, final boolean reserveClassroom, final String dateOfBirth) {
		return studentService.updateStudent(dni, name, surname1, surname2, reserveClassroom, dateOfBirth);
	}
	
}

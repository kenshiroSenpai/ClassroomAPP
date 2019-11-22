package com.kenshiro.classroom.entity.controllers;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.kenshiro.classroom.entity.models.Students;
import com.kenshiro.classroom.entity.services.StudentsService;

@Component
public class StudentsQuery implements GraphQLQueryResolver{
	
	@Autowired
	private StudentsService studentService;
	
	@Transactional(readOnly = true)
	public Iterable<Students> getAllStudents(){
		return studentService.getAllStudents();
	}
	
	@Transactional(readOnly = true)
	public Optional<Students> getByDni(final String dni){
		return studentService.getByDni(dni);
	}

}

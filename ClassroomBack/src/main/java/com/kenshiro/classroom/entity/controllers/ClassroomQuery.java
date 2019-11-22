package com.kenshiro.classroom.entity.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import com.kenshiro.classroom.entity.models.Classroom;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.kenshiro.classroom.entity.services.ClassroomService;

@Component
public class ClassroomQuery implements GraphQLQueryResolver{
	
	@Autowired
	private ClassroomService classroomService;
	
	@Transactional(readOnly = true)
	public Iterable<Classroom> getAllClassroom(){
		return classroomService.getAllClassroom();
	}
	
	@Transactional(readOnly = true)
	public Optional<Classroom> getByNumber(final long number) {
		return classroomService.getByNumber(number);
	}
	
}

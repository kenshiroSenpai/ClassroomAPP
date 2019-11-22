package com.kenshiro.classroom.entity.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.kenshiro.classroom.entity.models.Classroom;
import com.kenshiro.classroom.entity.services.ClassroomService;

@Component
public class ClassroomMutation implements GraphQLMutationResolver{
	
	@Autowired
	private ClassroomService classroomService;
	
	@Transactional
	public Classroom createClassroom(final long number, final String building) {
		return classroomService.createClassroom(number, building);
	}
	
	@Transactional
	public boolean deleteClassroom(final long number) {
		return classroomService.deleteClassroom(number);
	}
	
	@Transactional
	public Optional<Classroom> updateClassroom(final long number, final String building){
		return classroomService.updateClassroom(number, building);
	}
}

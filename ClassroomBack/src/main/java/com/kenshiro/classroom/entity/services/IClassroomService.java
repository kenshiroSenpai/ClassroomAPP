package com.kenshiro.classroom.entity.services;

import com.kenshiro.classroom.entity.models.Classroom;
import java.util.Optional;
public interface IClassroomService {
	
	public Iterable<Classroom> getAllClassroom();
	public Optional<Classroom> getByNumber(long number);
	public Classroom createClassroom(long number, String building);
	public boolean deleteClassroom(long number);
	public Optional<Classroom> updateClassroom(long number, String building);

}

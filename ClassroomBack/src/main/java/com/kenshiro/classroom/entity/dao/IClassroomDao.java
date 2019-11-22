package com.kenshiro.classroom.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.kenshiro.classroom.entity.models.Classroom;

public interface IClassroomDao extends CrudRepository<Classroom, Long>{

}

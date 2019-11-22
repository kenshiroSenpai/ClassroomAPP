package com.kenshiro.classroom.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.kenshiro.classroom.entity.models.Students;

public interface IStudentsDao extends CrudRepository<Students, String>{

}

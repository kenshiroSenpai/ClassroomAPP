package com.kenshiro.classroom.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.kenshiro.classroom.entity.models.Users;

public interface IUsersDao extends CrudRepository<Users, String>{
	
	public Users findUserByUsername(String username);

}

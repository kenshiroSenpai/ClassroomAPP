package com.kenshiro.classroom.entity.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.kenshiro.classroom.entity.models.Users;
import com.kenshiro.classroom.entity.services.UserService;

@Component
public class UsersQuery implements GraphQLQueryResolver{
	
	@Autowired
	private UserService userService;
	
	@Transactional(readOnly = true)
	public Iterable<Users> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@Transactional(readOnly = true)
	public Optional<Users> getUser(String username){
		return userService.getUser(username);
	}
	
	

}

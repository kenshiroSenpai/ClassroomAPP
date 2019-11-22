package com.kenshiro.classroom.entity.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.kenshiro.classroom.entity.models.Users;
import com.kenshiro.classroom.entity.services.UserService;
@Component
public class UsersMutation implements GraphQLMutationResolver{

	@Autowired
	private UserService userService;
	
	@Transactional
	public Users createUser(String username, String password, String privileges, String studentsDni) {
		return userService.createUser(username, password, privileges.toUpperCase(), studentsDni);
	}
	@Transactional
	public boolean deleteUser(String username) {
		return userService.deleteUser(username);
	}
	
	@Transactional
	public Users updateUser(String username, String newUsername, String password, String privileges, String studentsDni) {
		return userService.updateUser(username, newUsername, password, privileges.toUpperCase(), studentsDni);
	}
}

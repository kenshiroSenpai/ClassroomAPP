package com.kenshiro.classroom.entity.services;

import java.util.Optional;
import com.kenshiro.classroom.entity.models.Users;

public interface IUserService {
	
	public Iterable<Users> getAllUsers();
	public Optional<Users> getUser(String username);
	public Users createUser(String username, String password, String privileges, String studentsDni);
	public boolean deleteUser(String username);
	public Users updateUser(String username, String newUsername, String password, String privileges, String studentsDni);

}

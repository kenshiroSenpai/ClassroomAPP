package com.kenshiro.classroom.entity.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.kenshiro.classroom.entity.dao.IStudentsDao;
import com.kenshiro.classroom.entity.dao.IUsersDao;
import com.kenshiro.classroom.entity.models.Students;
import com.kenshiro.classroom.entity.models.Users;

@Service
public class UserService implements IUserService {

	@Autowired
	private IUsersDao userDao;

	@Autowired
	private IStudentsDao studentsDao;

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Iterable<Users> getAllUsers() {
		return userDao.findAll();
	}

	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public Optional<Users> getUser(String username) {
		return userDao.findById(username);
	}

	@Override
	public Users createUser(String username, String password, String privileges, String studentsDni) {
		Users user = new Users();
		user.setUser(username);
		String hashedPassword = passwordEncoder(password);
		user.setPassword(hashedPassword);
		if (privileges.isEmpty()) {
			user.setPrivileges("USER");
		} else {
			user.setPrivileges(privileges);
		}
		if (!studentsDni.isEmpty()) {
			studentsDao.findById(studentsDni).ifPresent(studentsFound -> {
				user.setStudentsDni(studentsFound);
			});
		} else {
			user.setStudentsDni(null);
		}
		return userDao.save(user);
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteUser(String username) {
		try {
			userDao.deleteById(username);
		} catch (IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public boolean updateUser(String username, String newUsername, String password, String privileges,
			String studentsDni) {
		Optional<Users> user = userDao.findById(username);
		user.ifPresent(userFound -> {
			final Users newUser = new Users();
			String oldPrivileges = userFound.getPrivileges().substring(5);
			String oldPassword = userFound.getPassword();
			Students oldStudent = userFound.getStudentsDni();
			userDao.deleteById(username);
			newUser.setUser(newUsername);
			if (password.isEmpty()) {
				newUser.setPassword(oldPassword);
			} else {
				String hashedPassword = passwordEncoder(password);
				newUser.setPassword(hashedPassword);
			}
			if (privileges.isEmpty()) {
				newUser.setPrivileges(oldPrivileges);
			} else {
				newUser.setPrivileges(privileges);
			}
			if (studentsDni.isEmpty()) {
				newUser.setStudentsDni(oldStudent);
			} else {
				studentsDao.findById(studentsDni).ifPresent(studentsFound -> {
					newUser.setStudentsDni(studentsFound);
				});
			}
			userDao.save(newUser);
		});	
		return true;
	}
	
	@Override
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	public boolean login() {
		return true;
	}
	
	
	//Password Encoding using Bcrypt Encoder
	private String passwordEncoder(String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		return hashedPassword;
	}

}

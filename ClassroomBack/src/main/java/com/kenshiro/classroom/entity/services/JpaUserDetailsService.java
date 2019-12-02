package com.kenshiro.classroom.entity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenshiro.classroom.entity.dao.IUsersDao;
import com.kenshiro.classroom.entity.models.Users;
import java.util.ArrayList;
import java.util.List;

@Service("JpaUserDetailsService")
public class JpaUserDetailsService implements UserDetailsService {

	@Autowired
	private IUsersDao userDao;
	
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Users user = userDao.findUserByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("User " + username + " doesn't exist");
		}
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		if(user.getPrivileges()!=null) {
			authorities.add(new SimpleGrantedAuthority(user.getPrivileges()));
		}
		
		if(authorities.isEmpty()) {
			throw new UsernameNotFoundException("User " + username + " doesn't have any assigned role");
		}
		
		return new User(user.getUser(), user.getPassword(), true, true, true, true, authorities);
	}

}

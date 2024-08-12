package com.ecosun.security_trial;
//package com.ecosun.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.ecosun.exceptions.ResourceNotFoundException;
//import com.ecosun.model.User;
//import com.ecosun.repository.UserRepository;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService { // step 2
//
//	@Autowired
//	private UserRepository userRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//		User user = userRepository.findByEmail(username)
//				.orElseThrow(() -> new ResourceNotFoundException("User Not found"));
//
//		CustomUserDetailsConfig customUserDetailsConfig = new CustomUserDetailsConfig(user);
//
//		return customUserDetailsConfig;
//	}
//
//}

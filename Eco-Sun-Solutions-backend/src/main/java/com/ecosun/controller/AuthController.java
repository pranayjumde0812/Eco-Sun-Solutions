package com.ecosun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecosun.dto.JwtAuthRequest;
import com.ecosun.dto.JwtAuthResponse;
import com.ecosun.security.JwtTokenHelper;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService detailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest authRequest) {

		this.authenticate(authRequest.getUsername(), authRequest.getPassword());

		UserDetails userDetails = this.detailsService.loadUserByUsername(authRequest.getUsername());

		String token = this.jwtTokenHelper.generateToken(userDetails);

		JwtAuthResponse authResponse = new JwtAuthResponse();
		authResponse.setToken(token);

		return new ResponseEntity<JwtAuthResponse>(authResponse, HttpStatus.OK);
	}

	private void authenticate(String username, String Password){

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				Password);

		this.authenticationManager.authenticate(authenticationToken);

	}

}

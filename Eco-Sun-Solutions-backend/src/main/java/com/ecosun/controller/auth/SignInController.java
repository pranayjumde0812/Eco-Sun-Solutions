package com.ecosun.controller.auth;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecosun.dto.request.JwtAuthRequestDTO;
import com.ecosun.dto.response.JwtAuthResponse;
import com.ecosun.security.JwtUtils;
import com.ecosun.service.UserService;

@RestController
@RequestMapping("/auth")
public class SignInController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@RequestBody @Valid JwtAuthRequestDTO authRequest) {

		try {

			// Create a token to store unverified user email and password
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
					authRequest.getPassword());

			// Authenticate the token using the AuthenticationManager
			Authentication verifiedToken = authenticationManager.authenticate(token);

			// Generate JWT token
			String jwtToken = jwtUtils.generateJwtToken(verifiedToken);
			JwtAuthResponse resp = new JwtAuthResponse(jwtToken, "Authentication successful!");
			
			return ResponseEntity.status(HttpStatus.OK).body(resp);

		} catch (BadCredentialsException e) {
			System.err.println("Invalid credentials: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");

		} catch (AuthenticationException e) {
			System.err.println("Authentication error: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed.");

		} catch (Exception e) {
			System.err.println("Unexpected error: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
		}

	}
}

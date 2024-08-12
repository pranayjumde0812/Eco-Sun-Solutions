package com.ecosun.controller.auth;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecosun.dto.request.UserSignupResquestDTO;
import com.ecosun.dto.response.UserResponseDTO;
import com.ecosun.service.UserService;

@RestController
@RequestMapping("/auth")
public class SignUpController {

	@Autowired
	private UserService userService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody @Valid UserSignupResquestDTO signupDto) {
		
		UserResponseDTO createdUser = userService.createUser(signupDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
		
	}
}

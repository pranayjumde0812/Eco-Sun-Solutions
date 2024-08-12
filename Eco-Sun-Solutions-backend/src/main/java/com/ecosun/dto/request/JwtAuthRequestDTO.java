package com.ecosun.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class JwtAuthRequestDTO {

	@NotEmpty(message = "Email can't be blank")
	@Email(message = "Invalid email")
	String email;

	@NotEmpty
	@Length(min = 3, max = 50, message = "Invalid password length")
	String password;

}

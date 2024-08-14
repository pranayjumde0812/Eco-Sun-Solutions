package com.ecosun.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequestDto {
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String panNumber;
	private String aadharNumber;
	private String mobileNumber;

}

package com.ecosun.dto.request;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class UserSignupResquestDTO {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String panNumber;
	private String aadharNumber;
	private String mobileNumber;

}

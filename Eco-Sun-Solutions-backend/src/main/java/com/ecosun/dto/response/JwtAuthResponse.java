package com.ecosun.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {

	private String jwt;
	private String msg;
}

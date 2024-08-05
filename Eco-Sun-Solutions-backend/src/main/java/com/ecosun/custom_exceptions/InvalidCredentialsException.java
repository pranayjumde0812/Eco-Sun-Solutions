package com.ecosun.custom_exceptions;

public class InvalidCredentialsException extends RuntimeException {
	public InvalidCredentialsException(String mesg) {
		super(mesg);
	}
}

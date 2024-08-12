package com.ecosun.service;

import com.ecosun.dto.UserDTO;
import com.ecosun.dto.request.UserSignupResquestDTO;
import com.ecosun.dto.response.UserResponseDTO;

import java.util.List;

public interface UserService {
	List<UserDTO> getAllUsers();

	UserDTO getUserById(Long userId);

	UserResponseDTO createUser(UserSignupResquestDTO userDTO);

	UserDTO updateUser(Long userId, UserDTO userDTO);

	void deleteUser(Long userId);
	
}

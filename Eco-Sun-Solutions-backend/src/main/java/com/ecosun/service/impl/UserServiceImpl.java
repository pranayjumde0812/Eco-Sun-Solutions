package com.ecosun.service.impl;

import com.ecosun.dto.UserDTO;
import com.ecosun.dto.request.UserSignupResquestDTO;
import com.ecosun.dto.request.UserUpdateRequestDto;
import com.ecosun.dto.response.UserResponseDTO;
import com.ecosun.model.User;
import com.ecosun.model.UserRole;
import com.ecosun.repository.UserRepository;
import com.ecosun.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public List<UserDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream()
				.map(user -> modelMapper.map(user, UserDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public UserDTO getUserById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		return modelMapper.map(user, UserDTO.class);
	}

	@Override
	public UserResponseDTO createUser(UserSignupResquestDTO userSignupDto) {
		User user = modelMapper.map(userSignupDto, User.class);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole(UserRole.ROLE_CUSTOMER);
		user = userRepository.save(user);
		return modelMapper.map(user, UserResponseDTO.class);
	}

	@Override
	public UserDTO updateUser(Long id, UserUpdateRequestDto userDTO) {
		User user = userRepository.findById(userDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
		modelMapper.map(userDTO, user);
		user = userRepository.save(user);
		return modelMapper.map(user, UserDTO.class);
	}

	@Override
	public void deleteUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		userRepository.delete(user);
	}
}

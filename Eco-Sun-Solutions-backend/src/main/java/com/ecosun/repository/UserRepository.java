package com.ecosun.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	// to get user by username(email)
	Optional<User> findByEmail(String email);
}

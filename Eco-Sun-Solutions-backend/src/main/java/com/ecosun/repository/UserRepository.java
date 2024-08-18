package com.ecosun.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecosun.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	// to get user by username(email)
	User findByEmail(String email);
	
	@Query("select u.userId from User u where u.email = :email")
	Long findUserIdByEmail(String email);
}

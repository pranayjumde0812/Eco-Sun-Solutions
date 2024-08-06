package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}

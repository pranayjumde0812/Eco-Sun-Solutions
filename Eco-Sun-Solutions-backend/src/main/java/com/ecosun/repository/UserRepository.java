package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

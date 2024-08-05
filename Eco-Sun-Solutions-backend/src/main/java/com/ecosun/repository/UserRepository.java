package com.ecosun.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.entities.User;


//public interface UserRepository {
	public interface UserRepository extends JpaRepository<User, Long> {}

//}

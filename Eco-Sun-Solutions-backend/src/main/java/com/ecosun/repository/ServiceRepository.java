package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
	
}

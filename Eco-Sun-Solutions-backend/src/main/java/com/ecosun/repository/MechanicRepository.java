package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.Mechanic;

@Repository
public interface MechanicRepository extends JpaRepository<Mechanic, Long> {
	
	
}

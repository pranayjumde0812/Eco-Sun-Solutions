package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.model.Mechanic;

public interface MechanicRepository extends JpaRepository<Mechanic, Long> {
}

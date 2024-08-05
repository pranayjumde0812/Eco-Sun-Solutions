package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.entities.Service;

public interface ServiceRepository extends JpaRepository<Service, Long>{
}

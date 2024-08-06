package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}

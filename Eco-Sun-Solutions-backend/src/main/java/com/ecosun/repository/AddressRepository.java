package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}

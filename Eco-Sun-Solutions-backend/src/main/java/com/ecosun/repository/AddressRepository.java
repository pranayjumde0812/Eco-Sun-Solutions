package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}

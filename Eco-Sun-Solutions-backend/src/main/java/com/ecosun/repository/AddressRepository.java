package com.ecosun.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
	List<Address> findByUserUserId(Long userId);
}

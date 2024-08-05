package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.entities.PaymentDetails;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long>{

}

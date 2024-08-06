package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.model.Order;

public interface UserOrderRepository extends JpaRepository<Order, Long> {

}

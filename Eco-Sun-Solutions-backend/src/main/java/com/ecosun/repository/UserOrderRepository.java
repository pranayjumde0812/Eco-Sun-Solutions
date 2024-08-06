package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.Order;

@Repository
public interface UserOrderRepository extends JpaRepository<Order, Long> {

}

package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.entities.UserOrder;

public interface UserOrderRepository extends JpaRepository<UserOrder, Long>{

}

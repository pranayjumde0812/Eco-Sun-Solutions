package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}

package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecosun.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}

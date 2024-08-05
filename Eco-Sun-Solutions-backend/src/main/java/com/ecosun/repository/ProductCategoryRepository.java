package com.ecosun.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecosun.entities.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}

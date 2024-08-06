package com.ecosun.service;

import com.ecosun.dto.ProductCategoryDTO;
import java.util.List;

public interface ProductCategoryService {
    List<ProductCategoryDTO> getAllProductCategories();
    ProductCategoryDTO getProductCategoryById(Long categoryId);
    ProductCategoryDTO createProductCategory(ProductCategoryDTO productCategoryDTO);
    ProductCategoryDTO updateProductCategory(Long categoryId, ProductCategoryDTO productCategoryDTO);
    void deleteProductCategory(Long categoryId);
}

package com.ecosun.controller;

import com.ecosun.dto.ProductCategoryDTO;
import com.ecosun.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-categories")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductCategoryController {
    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping
    public List<ProductCategoryDTO> getAllProductCategories() {
        return productCategoryService.getAllProductCategories();
    }

    @GetMapping("/{id}")
    public ProductCategoryDTO getProductCategoryById(@PathVariable Long id) {
        return productCategoryService.getProductCategoryById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ProductCategoryDTO createProductCategory(@RequestBody ProductCategoryDTO productCategoryDTO) {
        return productCategoryService.createProductCategory(productCategoryDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ProductCategoryDTO updateProductCategory(@PathVariable Long id, @RequestBody ProductCategoryDTO productCategoryDTO) {
        return productCategoryService.updateProductCategory(id, productCategoryDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProductCategory(@PathVariable Long id) {
        productCategoryService.deleteProductCategory(id);
        return ResponseEntity.noContent().build();
    }
}

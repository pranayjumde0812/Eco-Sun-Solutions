package com.ecosun.service.impl;

import com.ecosun.dto.ProductCategoryDTO;
import com.ecosun.model.ProductCategory;
import com.ecosun.repository.ProductCategoryRepository;
import com.ecosun.service.ProductCategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductCategoryDTO> getAllProductCategories() {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        return categories.stream().map(category -> modelMapper.map(category, ProductCategoryDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductCategoryDTO getProductCategoryById(Long id) {
        ProductCategory category = productCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("ProductCategory not found"));
        return modelMapper.map(category, ProductCategoryDTO.class);
    }

    @Override
    public ProductCategoryDTO createProductCategory(ProductCategoryDTO productCategoryDTO) {
        ProductCategory category = modelMapper.map(productCategoryDTO, ProductCategory.class);
        category = productCategoryRepository.save(category);
        return modelMapper.map(category, ProductCategoryDTO.class);
    }

    @Override
    public ProductCategoryDTO updateProductCategory(Long id, ProductCategoryDTO productCategoryDTO) {
        ProductCategory category = productCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("ProductCategory not found"));
        modelMapper.map(productCategoryDTO, category);
        category = productCategoryRepository.save(category);
        return modelMapper.map(category, ProductCategoryDTO.class);
    }

    @Override
    public void deleteProductCategory(Long id) {
        ProductCategory category = productCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("ProductCategory not found"));
        productCategoryRepository.delete(category);
    }
}

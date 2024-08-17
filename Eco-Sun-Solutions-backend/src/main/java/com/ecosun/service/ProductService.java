package com.ecosun.service;

import java.util.List;

import com.ecosun.dto.ProductDTO;
import com.ecosun.dto.request.ProductRequestDto;
import com.ecosun.dto.response.ProductResponseDTO;

public interface ProductService {
	
	List<ProductDTO> getAllProducts();

	ProductDTO getProductById(Long productId);

	ProductDTO createProduct(ProductRequestDto productDTO);

	ProductDTO updateProduct(Long productId, ProductDTO productDTO);

	void deleteProduct(Long productId);
	
	List<ProductResponseDTO> searchByProductName(String productName);
	
	List<ProductResponseDTO> searchProductsByCategoryId(Long categoryId);

}

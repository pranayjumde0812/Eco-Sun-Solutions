package com.ecosun.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecosun.dto.ProductDTO;
import com.ecosun.dto.request.ProductRequestDto;
import com.ecosun.dto.response.ProductResponseDTO;
import com.ecosun.exceptions.ResourceNotFoundException;
import com.ecosun.model.Product;
import com.ecosun.model.ProductCategory;
import com.ecosun.repository.ProductCategoryRepository;
import com.ecosun.repository.ProductRepository;
import com.ecosun.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductCategoryRepository productCategoryRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ProductDTO> getAllProducts() {
		List<Product> products = productRepository.findAll();
		return products.stream().map(product -> modelMapper.map(product, ProductDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ProductDTO getProductById(Long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		return modelMapper.map(product, ProductDTO.class);
	}

	@Override
	public ProductDTO createProduct(ProductRequestDto productRequestDto) {
		ProductCategory category = productCategoryRepository.findById(productRequestDto.getCategoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

		Product product = modelMapper.map(productRequestDto, Product.class);

		product.setCategory(category);
		product.setAvailability("true");

		product = productRepository.save(product);
		return modelMapper.map(product, ProductDTO.class);
	}

	@Override
	public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
		Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		modelMapper.map(productDTO, product);
		product = productRepository.save(product);
		return modelMapper.map(product, ProductDTO.class);
	}

	@Override
	public void deleteProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		productRepository.delete(product);
	}

	@Override
	public List<ProductResponseDTO> searchByProductName(String productName) {
		List<Product> list = productRepository.findByProductNameContaining(productName);

		List<ProductResponseDTO> searchedProduct = list.stream()
				.map(products -> modelMapper.map(products, ProductResponseDTO.class)).collect(Collectors.toList());
		return searchedProduct;
	}
}

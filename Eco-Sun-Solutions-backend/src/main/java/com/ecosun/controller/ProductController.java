package com.ecosun.controller;

import com.ecosun.dto.ProductDTO;
import com.ecosun.dto.request.ProductRequestDto;
import com.ecosun.dto.response.ProductCategoryResponseDTO;
import com.ecosun.dto.response.ProductResponseDTO;
import com.ecosun.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public List<ProductDTO> getAllProducts() {
		return productService.getAllProducts();
	}

	@GetMapping("/{id}")
	public ProductDTO getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public ProductDTO createProduct(@RequestBody ProductRequestDto productDTO) {
		return productService.createProduct(productDTO);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ProductDTO updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
		return productService.updateProduct(id, productDTO);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/search/{query}")
	public ResponseEntity<?> searchProductsByName(@PathVariable String query) {

		List<ProductResponseDTO> searchByProductName = productService.searchByProductName(query);

		return new ResponseEntity<>(searchByProductName, HttpStatus.OK);
	}
	
	@GetMapping("/searchByCategoryId/{categoryId}")
	public ResponseEntity<?> searchProductsByCategoryId(@PathVariable Long categoryId) {

		List<ProductResponseDTO> searchElementByCategoryId = productService.searchProductsByCategoryId(categoryId);
				
		return new ResponseEntity<>(searchElementByCategoryId, HttpStatus.OK);
	}
}

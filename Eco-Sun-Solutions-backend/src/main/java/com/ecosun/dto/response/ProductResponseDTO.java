package com.ecosun.dto.response;

import lombok.Data;

@Data
public class ProductResponseDTO {

	private String productName;
	private String description;
	private String manufacturer;
	private Double wattage;
	private Double ampere;
	private Double weight;
	private Double efficiency;
	private Double unitPrice;
	private String dimensions;
	private String availability;
	private Double rating;
}

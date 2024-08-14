package com.ecosun.dto.request;

import lombok.Data;

@Data
public class ProductRequestDto {

	    private String productName;
	    private Long categoryId;
	    private String description;
	    private String manufacturer;
	    private Double wattage;
	    private Double ampere;
	    private Double weight;
	    private Double efficiency;
	    private Double unitPrice;
	    private String dimensions;
//	    private String availability;
//	    private String imageUrl;
	    private Double rating;
	    
	

}

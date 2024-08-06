package com.ecosun.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProductDTO {
    private Long productId;
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
    private String availability;
    private String imageUrl;
    private Double rating;
    private LocalDate creationDate;
    private LocalDate updatedOn;
}

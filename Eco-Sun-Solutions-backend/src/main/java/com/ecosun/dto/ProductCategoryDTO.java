package com.ecosun.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProductCategoryDTO {
    private Long categoryId;
    private String categoryName;
    private String categoryDescription;
    private LocalDate creationDate;
    private LocalDate updatedOn;
}

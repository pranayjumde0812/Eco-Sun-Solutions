package com.ecosun.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MechanicDTO {
	
    private Long mechanicId;
    private String name;
    private String mobileNumber;
    private String email;
    private Double salary;
    private String specialization;
    private LocalDate creationDate;
    private LocalDate updatedOn;
    
}

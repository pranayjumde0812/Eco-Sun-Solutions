package com.ecosun.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ServiceDTO {
    private Long serviceId;
    private String serviceType;
    private String serviceStatus;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer rating;
    private Long mechanicId;
    private LocalDate creationDate;
    private LocalDate updatedOn;
}

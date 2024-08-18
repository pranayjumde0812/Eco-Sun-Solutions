package com.ecosun.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrderDTO {
    private Long orderId;
    private Long addressId;
//    private String orderStatus;
    private Double totalAmount;
    private Long userId;
    private Long paymentId;
    private LocalDate orderDate;
    private List<Long> productIds;
    private LocalDate updatedOn;
}

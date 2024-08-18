package com.ecosun.dto;

import java.time.LocalDate;

import com.ecosun.model.PaymentType;

import lombok.Data;

@Data
public class PaymentDetailsDTO {
    private Long paymentId;
    private String transactionId;
    private PaymentType paymentMethod;
//    private PaymentStatus paymentStatus;
    private LocalDate transactionDate;
}

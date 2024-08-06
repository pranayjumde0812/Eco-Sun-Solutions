package com.ecosun.dto;

import com.ecosun.model.PaymentStatus;
import com.ecosun.model.PaymentType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PaymentDetailsDTO {
    private Long paymentId;
    private String transactionId;
    private PaymentType paymentMethod;
    private PaymentStatus paymentStatus;
    private LocalDate transactionDate;
}

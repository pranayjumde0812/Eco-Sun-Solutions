package com.ecosun.service;

import com.ecosun.dto.PaymentDetailsDTO;
import java.util.List;

public interface PaymentDetailsService {
    List<PaymentDetailsDTO> getAllPaymentDetails();
    PaymentDetailsDTO getPaymentDetailsById(Long paymentId);
    PaymentDetailsDTO createPaymentDetails(PaymentDetailsDTO paymentDetailsDTO);
    PaymentDetailsDTO updatePaymentDetails(Long paymentId, PaymentDetailsDTO paymentDetailsDTO);
    void deletePaymentDetails(Long paymentId);
}

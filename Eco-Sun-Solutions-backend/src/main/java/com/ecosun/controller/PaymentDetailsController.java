package com.ecosun.controller;

import com.ecosun.dto.PaymentDetailsDTO;
import com.ecosun.service.PaymentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment-details")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentDetailsController {
    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<PaymentDetailsDTO> getAllPaymentDetails() {
        return paymentDetailsService.getAllPaymentDetails();
    }

    @GetMapping("/{id}")
    public PaymentDetailsDTO getPaymentDetailsById(@PathVariable Long id) {
        return paymentDetailsService.getPaymentDetailsById(id);
    }

    @PostMapping
    public PaymentDetailsDTO createPaymentDetails(@RequestBody PaymentDetailsDTO paymentDetailsDTO) {
        return paymentDetailsService.createPaymentDetails(paymentDetailsDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PaymentDetailsDTO updatePaymentDetails(@PathVariable Long id, @RequestBody PaymentDetailsDTO paymentDetailsDTO) {
        return paymentDetailsService.updatePaymentDetails(id, paymentDetailsDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePaymentDetails(@PathVariable Long id) {
        paymentDetailsService.deletePaymentDetails(id);
        return ResponseEntity.noContent().build();
    }
}

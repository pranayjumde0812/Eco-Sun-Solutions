package com.ecosun.service.impl;

import com.ecosun.dto.PaymentDetailsDTO;
import com.ecosun.model.PaymentDetails;
import com.ecosun.repository.PaymentDetailsRepository;
import com.ecosun.service.PaymentDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {
    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PaymentDetailsDTO> getAllPaymentDetails() {
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        return paymentDetailsList.stream().map(paymentDetails -> modelMapper.map(paymentDetails, PaymentDetailsDTO.class)).collect(Collectors.toList());
    }

    @Override
    public PaymentDetailsDTO getPaymentDetailsById(Long id) {
        PaymentDetails paymentDetails = paymentDetailsRepository.findById(id).orElseThrow(() -> new RuntimeException("PaymentDetails not found"));
        return modelMapper.map(paymentDetails, PaymentDetailsDTO.class);
    }

    @Override
    public PaymentDetailsDTO createPaymentDetails(PaymentDetailsDTO paymentDetailsDTO) {
        PaymentDetails paymentDetails = modelMapper.map(paymentDetailsDTO, PaymentDetails.class);
        paymentDetails = paymentDetailsRepository.save(paymentDetails);
        return modelMapper.map(paymentDetails, PaymentDetailsDTO.class);
    }

    @Override
    public PaymentDetailsDTO updatePaymentDetails(Long id,PaymentDetailsDTO paymentDetailsDTO) {
        PaymentDetails paymentDetails = paymentDetailsRepository.findById(id).orElseThrow(() -> new RuntimeException("PaymentDetails not found"));
        modelMapper.map(paymentDetailsDTO, paymentDetails);
        paymentDetails = paymentDetailsRepository.save(paymentDetails);
        return modelMapper.map(paymentDetails, PaymentDetailsDTO.class);
    }

    @Override
    public void deletePaymentDetails(Long id) {
        PaymentDetails paymentDetails = paymentDetailsRepository.findById(id).orElseThrow(() -> new RuntimeException("PaymentDetails not found"));
        paymentDetailsRepository.delete(paymentDetails);
    }
}


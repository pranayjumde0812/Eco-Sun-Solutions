package com.ecosun.service.impl;

import com.ecosun.dto.OrderDTO;
import com.ecosun.model.Order;
import com.ecosun.repository.AddressRepository;
import com.ecosun.repository.OrderRepository;
import com.ecosun.repository.PaymentDetailsRepository;
import com.ecosun.repository.UserRepository;
import com.ecosun.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private PaymentDetailsRepository paymentDetailsRepository;

	@Override
	public List<OrderDTO> getAllOrders() {
		List<Order> orders = orderRepository.findAll();
		return orders.stream().map(order -> modelMapper.map(order, OrderDTO.class)).collect(Collectors.toList());
	}

	@Override
	public OrderDTO getOrderById(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO createOrder(OrderDTO orderDTO) {
		Order order = modelMapper.map(orderDTO, Order.class);
		order.setUser(userRepository.findById(orderDTO.getUserId()).get());
		order.setAddress(addressRepository.findById(orderDTO.getAddressId()).get());
		order.setPaymentDetails(paymentDetailsRepository.findById(orderDTO.getPaymentId()).get());
		order = orderRepository.save(order);

		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
		modelMapper.map(orderDTO, order);
		order = orderRepository.save(order);
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public void deleteOrder(Long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
		orderRepository.delete(order);
	}

	@Override
	public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
		List<Order> findByUserUserId = orderRepository.findByUserUserId(customerId);

		return findByUserUserId.stream()
				.map(order -> {OrderDTO dto = modelMapper.map(order, OrderDTO.class);
				dto.setAddressId(order.getAddress() != null ? order.getAddress().getAddressId() : null);
                dto.setUserId(order.getUser() != null ? order.getUser().getUserId() : null);
                dto.setPaymentId(order.getPaymentDetails() != null ? order.getPaymentDetails().getPaymentId() : null);
                return dto;})
				
				.collect(Collectors.toList());
	}
}

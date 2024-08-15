package com.ecosun.controller;

import com.ecosun.dto.OrderDTO;
import com.ecosun.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderDTO getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.createOrder(orderDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public OrderDTO updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        return orderService.updateOrder(id, orderDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}

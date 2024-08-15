package com.ecosun.controller;

import com.ecosun.dto.ServiceDTO;
import com.ecosun.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public List<ServiceDTO> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ServiceDTO getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceDTO createService(@RequestBody ServiceDTO serviceDTO) {
    	
        return serviceService.createService(serviceDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceDTO updateService(@PathVariable Long id, @RequestBody ServiceDTO serviceDTO) {
        return serviceService.updateService(id, serviceDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}

package com.ecosun.service;

import com.ecosun.dto.ServiceDTO;
import java.util.List;

public interface ServiceService {
    List<ServiceDTO> getAllServices();
    ServiceDTO getServiceById(Long serviceId);
    ServiceDTO createService(ServiceDTO serviceDTO);
    ServiceDTO updateService(Long serviceId, ServiceDTO serviceDTO);
    void deleteService(Long serviceId);
}

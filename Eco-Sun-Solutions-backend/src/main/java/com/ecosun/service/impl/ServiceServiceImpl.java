package com.ecosun.service.impl;

import com.ecosun.dto.ServiceDTO;
import com.ecosun.model.Service;
import com.ecosun.repository.ServiceRepository;
import com.ecosun.service.ServiceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ServiceDTO> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        return services.stream().map(service -> modelMapper.map(service, ServiceDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ServiceDTO getServiceById(Long id) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    public ServiceDTO createService(ServiceDTO serviceDTO) {
        Service service = modelMapper.map(serviceDTO, Service.class);
        service = serviceRepository.save(service);
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    public ServiceDTO updateService(Long id, ServiceDTO serviceDTO) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        modelMapper.map(serviceDTO, service);
        service = serviceRepository.save(service);
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    public void deleteService(Long id) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        serviceRepository.delete(service);
    }
}

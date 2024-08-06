package com.ecosun.service.impl;

import com.ecosun.dto.MechanicDTO;
import com.ecosun.model.Mechanic;
import com.ecosun.repository.MechanicRepository;
import com.ecosun.service.MechanicService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MechanicServiceImpl implements MechanicService {
    @Autowired
    private MechanicRepository mechanicRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MechanicDTO> getAllMechanics() {
        List<Mechanic> mechanics = mechanicRepository.findAll();
        return mechanics.stream().map(mechanic -> modelMapper.map(mechanic, MechanicDTO.class)).collect(Collectors.toList());
    }

    @Override
    public MechanicDTO getMechanicById(Long id) {
        Mechanic mechanic = mechanicRepository.findById(id).orElseThrow(() -> new RuntimeException("Mechanic not found"));
        return modelMapper.map(mechanic, MechanicDTO.class);
    }

    @Override
    public MechanicDTO createMechanic(MechanicDTO mechanicDTO) {
        Mechanic mechanic = modelMapper.map(mechanicDTO, Mechanic.class);
        mechanic = mechanicRepository.save(mechanic);
        return modelMapper.map(mechanic, MechanicDTO.class);
    }

    @Override
    public MechanicDTO updateMechanic(Long id, MechanicDTO mechanicDTO) {
        Mechanic mechanic = mechanicRepository.findById(id).orElseThrow(() -> new RuntimeException("Mechanic not found"));
        modelMapper.map(mechanicDTO, mechanic);
        mechanic = mechanicRepository.save(mechanic);
        return modelMapper.map(mechanic, MechanicDTO.class);
    }

    @Override
    public void deleteMechanic(Long id) {
        Mechanic mechanic = mechanicRepository.findById(id).orElseThrow(() -> new RuntimeException("Mechanic not found"));
        mechanicRepository.delete(mechanic);
    }
}

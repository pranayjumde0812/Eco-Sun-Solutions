package com.ecosun.service;

import com.ecosun.dto.MechanicDTO;
import java.util.List;

public interface MechanicService {
    List<MechanicDTO> getAllMechanics();
    MechanicDTO getMechanicById(Long mechanicId);
    MechanicDTO createMechanic(MechanicDTO mechanicDTO);
    MechanicDTO updateMechanic(Long mechanicId, MechanicDTO mechanicDTO);
    void deleteMechanic(Long mechanicId);
}

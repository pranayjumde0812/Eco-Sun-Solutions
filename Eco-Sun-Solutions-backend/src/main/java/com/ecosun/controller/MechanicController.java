package com.ecosun.controller;

import com.ecosun.dto.MechanicDTO;
import com.ecosun.service.MechanicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mechanics")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MechanicController {
	
	@Autowired
	private MechanicService mechanicService;

	@GetMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<MechanicDTO> getAllMechanics() {
		return mechanicService.getAllMechanics();
	}

	@GetMapping("/{id}")
//	@PreAuthorize("hasRole('CUSTOMER')")
	public MechanicDTO getMechanicById(@PathVariable Long id) {
		return mechanicService.getMechanicById(id);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public MechanicDTO createMechanic(@RequestBody MechanicDTO mechanicDTO) {
		return mechanicService.createMechanic(mechanicDTO);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public MechanicDTO updateMechanic(@PathVariable Long id, @RequestBody MechanicDTO mechanicDTO) {
		return mechanicService.updateMechanic(id, mechanicDTO);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Void> deleteMechanic(@PathVariable Long id) {
		mechanicService.deleteMechanic(id);
		return ResponseEntity.noContent().build();
	}
}

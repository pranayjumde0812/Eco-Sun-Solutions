package com.ecosun.controller;

import com.ecosun.dto.AddressDTO;
import com.ecosun.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AddressController {

	@Autowired
	private AddressService addressService;

	@GetMapping
	public List<AddressDTO> getAllAddresses() {
		return addressService.getAllAddresses();
	}

	@GetMapping("/{id}")
	public AddressDTO getAddressById(@PathVariable Long id) {
		return addressService.getAddressById(id);
	}

	@PostMapping
	public AddressDTO createAddress(@RequestBody AddressDTO addressDTO) {
		return addressService.createAddress(addressDTO);
	}

	@PutMapping("/{id}")
	public AddressDTO updateAddress(@PathVariable Long id, @RequestBody AddressDTO addressDTO) {
		return addressService.updateAddress(id, addressDTO);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
		addressService.deleteAddress(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getAddressesByUserId(@PathVariable Long userId) {

		List<AddressDTO> findAddressByUserId = addressService.findAddressByUserId(userId);

		return new ResponseEntity<>(findAddressByUserId, HttpStatus.OK);
	}

}

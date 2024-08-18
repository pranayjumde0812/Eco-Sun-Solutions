package com.ecosun.service.impl;

import com.ecosun.dto.AddressDTO;
import com.ecosun.model.Address;
import com.ecosun.repository.AddressRepository;
import com.ecosun.repository.UserRepository;
import com.ecosun.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<AddressDTO> getAllAddresses() {
		List<Address> addresses = addressRepository.findAll();
		return addresses.stream().map(address -> modelMapper.map(address, AddressDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public AddressDTO getAddressById(Long addressId) {
		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new RuntimeException("Address not found"));
		return modelMapper.map(address, AddressDTO.class);
	}

	@Override
	public AddressDTO createAddress(AddressDTO addressDTO) {
		Address address = modelMapper.map(addressDTO, Address.class);
		
		address.setUser(userRepository.findById(addressDTO.getUserId()).get());
		
		address = addressRepository.save(address);
		return modelMapper.map(address, AddressDTO.class);
	}

	@Override
	public AddressDTO updateAddress(Long addressId, AddressDTO addressDTO) {
		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new RuntimeException("Address not found"));
		modelMapper.map(addressDTO, address);
		address = addressRepository.save(address);
		return modelMapper.map(address, AddressDTO.class);
	}

	@Override
	public void deleteAddress(Long addressId) {
		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new RuntimeException("Address not found"));
		addressRepository.delete(address);
	}

	@Override
	public List<AddressDTO> findAddressByUserId(Long userId) {
		List<Address> addresses = addressRepository.findByUserUserId(userId);

		List<AddressDTO> addressDto = addresses.stream().map(address -> modelMapper.map(address, AddressDTO.class))
				.collect(Collectors.toList());
		return addressDto;
	}

//	@Override		
//	public List<AddressDTO> getAddressesByUserId(Long userId) {
//	    List<Address> addresses = addressRepository.findByUserId(userId);
//	    return addresses.stream()
//	            .map(address -> modelMapper.map(address, AddressDTO.class))
//	            .collect(Collectors.toList());
//	}

}

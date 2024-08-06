package com.ecosun.service;

import com.ecosun.dto.AddressDTO;
import java.util.List;

public interface AddressService {
    List<AddressDTO> getAllAddresses();
    AddressDTO getAddressById(Long addressId);
    AddressDTO createAddress(AddressDTO addressDTO);
    AddressDTO updateAddress(Long addressId, AddressDTO addressDTO);
    void deleteAddress(Long addressId);
}

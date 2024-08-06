package com.ecosun.dto;

import com.ecosun.model.AddressType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class AddressDTO {
    private Long addressId;
    private AddressType addressType;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private Long userId;
    private LocalDate creationDate;
    private LocalDate updatedOn;
}

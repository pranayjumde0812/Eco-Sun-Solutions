package com.ecosun.dto.response;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String role;
    private String email;
    private String panNumber;
    private String aadharNumber;
    private String mobileNumber;
//    private List<Long> addressIds;
//    private List<Long> orderIds;
    private LocalDate creationDate;
    private LocalDate updatedOn;
}

package com.ecosun.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String role;
    private String email;
    private String password;
    private String panNumber;
    private String aadharNumber;
    private String mobileNumber;
//    private List<Long> addressIds;
//    private List<Long> orderIds;
//    private LocalDate creationDate;
//    private LocalDate updatedOn;
}

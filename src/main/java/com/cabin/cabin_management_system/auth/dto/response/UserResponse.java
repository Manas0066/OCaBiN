package com.cabin.cabin_management_system.auth.dto.response;

import com.cabin.cabin_management_system.common.enums.Role;
import com.cabin.cabin_management_system.common.enums.UserStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private String employeeId;

    private String department;

    private Role role;

    private UserStatus status;
}
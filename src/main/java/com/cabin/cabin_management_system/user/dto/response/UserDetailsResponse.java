package com.cabin.cabin_management_system.user.dto.response;

import com.cabin.cabin_management_system.common.enums.Role;
import com.cabin.cabin_management_system.common.enums.UserStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsResponse {

    private Long id;

    private String name;

    private String email;

    private String employeeId;

    private String department;

    private Role role;

    private UserStatus status;

    private Boolean firstLogin;
}
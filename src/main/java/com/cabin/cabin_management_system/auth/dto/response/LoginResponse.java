package com.cabin.cabin_management_system.auth.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginResponse {

    private String tokenType;

    private String token;

    private UserResponse user;

    private boolean passwordChangeRequired;
}

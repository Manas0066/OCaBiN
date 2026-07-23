package com.cabin.cabin_management_system.auth.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {

    private boolean passwordChangeRequired;

    private String token;

    private String tokenType;

    private UserResponse user;
}
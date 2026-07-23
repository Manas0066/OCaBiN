package com.cabin.cabin_management_system.user.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InviteUserResponse {

    private UserDetailsResponse user;

    private String message;
}
package com.cabin.cabin_management_system.user.service;

import com.cabin.cabin_management_system.user.dto.request.InviteUserRequest;
import com.cabin.cabin_management_system.user.dto.request.UpdateUserRequest;
import com.cabin.cabin_management_system.user.dto.response.InviteUserResponse;
import com.cabin.cabin_management_system.user.dto.response.UserDetailsResponse;
import com.cabin.cabin_management_system.user.dto.response.UserListResponse;

import java.util.List;

public interface UserManagementService {

    InviteUserResponse inviteUser(InviteUserRequest request);

    List<UserListResponse> getAllUsers();

    UserDetailsResponse getUserById(Long id);

    UserDetailsResponse updateUser(Long id, UpdateUserRequest request);

    void disableUser(Long id);

    void enableUser(Long id);

    void resendInvitation(Long id);

}
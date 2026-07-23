package com.cabin.cabin_management_system.user.controller;

import com.cabin.cabin_management_system.common.response.ApiResponse;
import com.cabin.cabin_management_system.user.dto.request.InviteUserRequest;
import com.cabin.cabin_management_system.user.dto.request.UpdateUserRequest;
import com.cabin.cabin_management_system.user.dto.response.InviteUserResponse;
import com.cabin.cabin_management_system.user.dto.response.UserDetailsResponse;
import com.cabin.cabin_management_system.user.dto.response.UserListResponse;
import com.cabin.cabin_management_system.user.service.UserManagementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserManagementService userManagementService;

    public AdminUserController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InviteUserResponse>> inviteUser(
            @Valid @RequestBody InviteUserRequest request
    ) {

        InviteUserResponse response =
                userManagementService.inviteUser(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                true,
                                "Invitation sent successfully.",
                                response
                        )
                );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserListResponse>>> getAllUsers() {

        List<UserListResponse> response =
                userManagementService.getAllUsers();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Users fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDetailsResponse>> getUser(
            @PathVariable Long id
    ) {

        UserDetailsResponse response =
                userManagementService.getUserById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User fetched successfully.",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDetailsResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ) {

        UserDetailsResponse response =
                userManagementService.updateUser(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User updated successfully.",
                        response
                )
        );
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<ApiResponse<Void>> disableUser(
            @PathVariable Long id
    ) {

        userManagementService.disableUser(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User disabled successfully.",
                        null
                )
        );
    }

    @PatchMapping("/{id}/enable")
    public ResponseEntity<ApiResponse<Void>> enableUser(
            @PathVariable Long id
    ) {

        userManagementService.enableUser(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User enabled successfully.",
                        null
                )
        );
    }

    @PostMapping("/{id}/resend-invitation")
    public ResponseEntity<ApiResponse<Void>> resendInvitation(
            @PathVariable Long id
    ) {

        userManagementService.resendInvitation(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Invitation sent successfully.",
                        null
                )
        );
    }

}
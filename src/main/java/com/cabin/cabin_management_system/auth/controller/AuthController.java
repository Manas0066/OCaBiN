package com.cabin.cabin_management_system.controller;

import com.cabin.cabin_management_system.auth.dto.request.LoginRequest;
import com.cabin.cabin_management_system.auth.dto.request.RegisterRequest;
import com.cabin.cabin_management_system.auth.dto.response.LoginResponse;
import com.cabin.cabin_management_system.auth.dto.response.UserResponse;
import com.cabin.cabin_management_system.auth.service.AuthService;
import com.cabin.cabin_management_system.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(
            @RequestBody RegisterRequest request){

        UserResponse response = authService.register(request);

        ApiResponse<UserResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "User Registered Successfully",
                        response
                );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody LoginRequest request){

        LoginResponse response = authService.login(request);

        ApiResponse<LoginResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Login Successful",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }
}

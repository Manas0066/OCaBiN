package com.cabin.cabin_management_system.auth.service;

import com.cabin.cabin_management_system.auth.dto.request.LoginRequest;
import com.cabin.cabin_management_system.auth.dto.request.RegisterRequest;
import com.cabin.cabin_management_system.auth.dto.response.LoginResponse;
import com.cabin.cabin_management_system.auth.dto.response.UserResponse;
import com.cabin.cabin_management_system.auth.entity.User;
import com.cabin.cabin_management_system.auth.repository.UserRepository;
import com.cabin.cabin_management_system.auth.security.JwtService;
import com.cabin.cabin_management_system.common.enums.Role;
import com.cabin.cabin_management_system.common.enums.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtService jwtService){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService = jwtService;
    }


    public UserResponse register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        // Check if employee ID already exists
        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists.");
        }

        // Create User
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmployeeId(request.getEmployeeId());
        user.setDepartment(request.getDepartment());

        user.setRole(Role.EMPLOYEE);
        user.setStatus(UserStatus.ACTIVE);

        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Save User
        userRepository.save(user);

        // Prepare Response
        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setEmployeeId(user.getEmployeeId());
        response.setDepartment(user.getDepartment());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());

        return response;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NoSuchElementException("User not found."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid Password");
        }

        String token = jwtService.generateToken(user);

        UserResponse userResponse = new UserResponse();

        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setEmployeeId(user.getEmployeeId());
        userResponse.setDepartment(user.getDepartment());
        userResponse.setRole(user.getRole());
        userResponse.setStatus(user.getStatus());

        LoginResponse response = new LoginResponse();

        response.setTokenType("Bearer");
        response.setToken(token);
        response.setUser(userResponse);

        return response;
    }
}

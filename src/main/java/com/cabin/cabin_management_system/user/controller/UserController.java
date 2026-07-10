package com.cabin.cabin_management_system.user.controller;

import com.cabin.cabin_management_system.auth.dto.response.UserResponse;
import com.cabin.cabin_management_system.auth.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/profile")
    public UserResponse profile() {

        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

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
}
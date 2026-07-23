package com.cabin.cabin_management_system.user.mapper;

import com.cabin.cabin_management_system.auth.entity.User;
import com.cabin.cabin_management_system.user.dto.response.UserDetailsResponse;
import com.cabin.cabin_management_system.user.dto.response.UserListResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserListResponse toUserListResponse(User user) {

        UserListResponse response = new UserListResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setEmployeeId(user.getEmployeeId());
        response.setDepartment(user.getDepartment());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setFirstLogin(user.getFirstLogin());

        return response;
    }

    public UserDetailsResponse toUserDetailsResponse(User user) {

        UserDetailsResponse response = new UserDetailsResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setEmployeeId(user.getEmployeeId());
        response.setDepartment(user.getDepartment());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setFirstLogin(user.getFirstLogin());

        return response;
    }
}
package com.cabin.cabin_management_system.user.service.impl;

import com.cabin.cabin_management_system.auth.entity.User;
import com.cabin.cabin_management_system.auth.repository.UserRepository;
import com.cabin.cabin_management_system.common.enums.UserStatus;
import com.cabin.cabin_management_system.common.mail.EmailService;
import com.cabin.cabin_management_system.user.dto.request.InviteUserRequest;
import com.cabin.cabin_management_system.user.dto.request.UpdateUserRequest;
import com.cabin.cabin_management_system.user.dto.response.UserDetailsResponse;
import com.cabin.cabin_management_system.user.dto.response.UserListResponse;
import com.cabin.cabin_management_system.user.mapper.UserMapper;
import com.cabin.cabin_management_system.user.service.UserManagementService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import com.cabin.cabin_management_system.user.dto.response.InviteUserResponse;

@Service
public class UserManagementServiceImpl implements UserManagementService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final EmailService emailService;

    public UserManagementServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserMapper userMapper,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.emailService = emailService;
    }

    @Override
    public InviteUserResponse inviteUser(InviteUserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists.");
        }

        String temporaryPassword = generatePassword();

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setEmployeeId(request.getEmployeeId());
        user.setDepartment(request.getDepartment());
        user.setRole(request.getRole());

        user.setPassword(passwordEncoder.encode(temporaryPassword));

        user.setStatus(UserStatus.ACTIVE);

        user.setFirstLogin(true);

        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        emailService.sendTemporaryPasswordMail(
                user,
                temporaryPassword
        );

        return InviteUserResponse.builder()
                .user(userMapper.toUserDetailsResponse(user))
                .message("User created successfully.")
                .build();
    }

    @Override
    public List<UserListResponse> getAllUsers() {

        return userRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(userMapper::toUserListResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserDetailsResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found."));

        return userMapper.toUserDetailsResponse(user);
    }

    @Override
    public UserDetailsResponse updateUser(
            Long id,
            UpdateUserRequest request
    ) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found."));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setDepartment(request.getDepartment());
        user.setRole(request.getRole());

        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        return userMapper.toUserDetailsResponse(user);
    }

    @Override
    public void disableUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found."));

        user.setStatus(UserStatus.DISABLED);

        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
    }

    @Override
    public void enableUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found."));

        user.setStatus(UserStatus.ACTIVE);

        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
    }

    @Override
    public void resendInvitation(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found."));

        /*
            emailService.sendInvitationMail(...)
        */
    }

    private String generatePassword() {

        String chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

        SecureRandom random = new SecureRandom();

        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < 10; i++) {

            builder.append(
                    chars.charAt(
                            random.nextInt(chars.length())
                    )
            );
        }

        return builder.toString();
    }



}
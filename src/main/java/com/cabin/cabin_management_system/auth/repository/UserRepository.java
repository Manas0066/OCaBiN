package com.cabin.cabin_management_system.auth.repository;

import com.cabin.cabin_management_system.auth.entity.User;
import com.cabin.cabin_management_system.common.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByEmployeeId(String employeeId);

    boolean existsByEmail(String email);

    boolean existsByEmployeeId(String employeeId);

    List<User> findAllByOrderByCreatedAtDesc();

    List<User> findByStatus(UserStatus status);

    List<User> findByDepartment(String department);

    List<User> findByStatusNot(UserStatus status);

    Optional<User> findByIdAndStatusNot(Long id, UserStatus status);
}

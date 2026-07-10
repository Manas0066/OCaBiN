package com.cabin.cabin_management_system.cabin.repository;

import com.cabin.cabin_management_system.cabin.entity.Cabin;
import com.cabin.cabin_management_system.common.enums.CabinStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CabinRepository extends JpaRepository<Cabin, Long> {

    boolean existsByCabinName(String cabinName);

    Optional<Cabin> findByCabinName(String cabinName);

    List<Cabin> findByActiveTrueAndStatus(CabinStatus status);
}
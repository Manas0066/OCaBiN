package com.cabin.cabin_management_system.cabin.repository;

import com.cabin.cabin_management_system.cabin.entity.CabinImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CabinImageRepository extends JpaRepository<CabinImage, Long> {
    List<CabinImage> findByCabinId(Long cabinId);
}
package com.cabin.cabin_management_system.cabin.service;

import com.cabin.cabin_management_system.cabin.dto.request.CabinRequest;
import com.cabin.cabin_management_system.cabin.dto.request.UpdateCabinRequest;
import com.cabin.cabin_management_system.cabin.dto.response.CabinResponse;
import com.cabin.cabin_management_system.cabin.entity.Cabin;
import com.cabin.cabin_management_system.cabin.repository.CabinRepository;
import com.cabin.cabin_management_system.common.enums.CabinStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CabinService {

    private final CabinRepository cabinRepository;

    public CabinService(CabinRepository cabinRepository) {
        this.cabinRepository = cabinRepository;
    }

    public CabinResponse createCabin(CabinRequest request) {

        if (cabinRepository.existsByCabinName(request.getCabinName())) {
            throw new IllegalArgumentException("Cabin already exists.");
        }

        Cabin cabin = new Cabin();

        cabin.setCabinName(request.getCabinName());
        cabin.setFloor(request.getFloor());
        cabin.setCapacity(request.getCapacity());
        cabin.setLocation(request.getLocation());
        cabin.setAmenities(request.getAmenities());

        cabin.setStatus(CabinStatus.AVAILABLE);
        cabin.setActive(true);

        LocalDateTime now = LocalDateTime.now();

        cabin.setCreatedAt(now);
        cabin.setUpdatedAt(now);

        Cabin savedCabin = cabinRepository.save(cabin);

        return convertToCabinResponse(savedCabin);
    }

    public List<CabinResponse> getAllCabins() {

        List<Cabin> cabins = cabinRepository.findAll();

        List<CabinResponse> response = new ArrayList<>();

        for (Cabin cabin : cabins) {
            response.add(convertToCabinResponse(cabin));
        }

        return response;
    }

    public CabinResponse getCabinById(Long id) {

        Cabin cabin = cabinRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Cabin not found."));

        return convertToCabinResponse(cabin);
    }

    public CabinResponse updateCabin(Long cabinId,
                                     UpdateCabinRequest request) {

        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() ->
                        new NoSuchElementException("Cabin not found."));

        // Check duplicate cabin name
        if (!cabin.getCabinName().equalsIgnoreCase(request.getCabinName())
                && cabinRepository.existsByCabinName(request.getCabinName())) {

            throw new IllegalArgumentException("Cabin name already exists.");
        }

        cabin.setCabinName(request.getCabinName());
        cabin.setFloor(request.getFloor());
        cabin.setCapacity(request.getCapacity());
        cabin.setLocation(request.getLocation());
        cabin.setAmenities(request.getAmenities());
        cabin.setStatus(request.getStatus());
        cabin.setActive(request.getActive());

        cabin.setUpdatedAt(LocalDateTime.now());

        Cabin savedCabin = cabinRepository.save(cabin);

        return convertToCabinResponse(savedCabin);
    }

    public CabinResponse deactivateCabin(Long cabinId) {

        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() ->
                        new NoSuchElementException("Cabin not found."));

        if (!cabin.getActive()) {
            throw new IllegalArgumentException("Cabin is already inactive.");
        }

        cabin.setActive(false);
        cabin.setUpdatedAt(LocalDateTime.now());

        Cabin savedCabin = cabinRepository.save(cabin);

        return convertToCabinResponse(savedCabin);
    }

    public CabinResponse activateCabin(Long cabinId) {

        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() ->
                        new NoSuchElementException("Cabin not found."));

        if (cabin.getActive()) {
            throw new IllegalArgumentException("Cabin is already active.");
        }

        cabin.setActive(true);
        cabin.setUpdatedAt(LocalDateTime.now());

        Cabin savedCabin = cabinRepository.save(cabin);

        return convertToCabinResponse(savedCabin);
    }

    public List<CabinResponse> getAvailableCabins() {

        return cabinRepository
                .findByActiveTrueAndStatus(CabinStatus.AVAILABLE)
                .stream()
                .map(this::convertToCabinResponse)
                .toList();
    }

    private CabinResponse convertToCabinResponse(Cabin cabin) {

        CabinResponse response = new CabinResponse();

        response.setId(cabin.getId());
        response.setCabinName(cabin.getCabinName());
        response.setFloor(cabin.getFloor());
        response.setCapacity(cabin.getCapacity());
        response.setLocation(cabin.getLocation());
        response.setAmenities(cabin.getAmenities());
        response.setStatus(cabin.getStatus());
        response.setActive(cabin.getActive());

        return response;
    }
}
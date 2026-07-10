package com.cabin.cabin_management_system.cabin.controller;

import com.cabin.cabin_management_system.cabin.dto.request.CabinRequest;
import com.cabin.cabin_management_system.cabin.dto.request.UpdateCabinRequest;
import com.cabin.cabin_management_system.cabin.dto.response.CabinResponse;
import com.cabin.cabin_management_system.cabin.service.CabinService;
import com.cabin.cabin_management_system.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cabins")
public class CabinController {

    private final CabinService cabinService;

    public CabinController(CabinService cabinService) {
        this.cabinService = cabinService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CabinResponse>> createCabin(
            @RequestBody CabinRequest request) {

        CabinResponse response = cabinService.createCabin(request);

        ApiResponse<CabinResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Cabin Created Successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CabinResponse>>> getAllCabins() {

        List<CabinResponse> response = cabinService.getAllCabins();

        ApiResponse<List<CabinResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Cabins fetched successfully.",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CabinResponse>> getCabinById(
            @PathVariable Long id) {

        CabinResponse response = cabinService.getCabinById(id);

        ApiResponse<CabinResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Cabin fetched successfully.",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{cabinId}")
    public ResponseEntity<ApiResponse<CabinResponse>> updateCabin(
            @PathVariable Long cabinId,
            @RequestBody UpdateCabinRequest request) {

        CabinResponse response =
                cabinService.updateCabin(cabinId, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Cabin Updated Successfully",
                        response
                )
        );
    }

    @PatchMapping("/{cabinId}/deactivate")
    public ResponseEntity<ApiResponse<CabinResponse>> deactivateCabin(
            @PathVariable Long cabinId) {

        CabinResponse response =
                cabinService.deactivateCabin(cabinId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Cabin deactivated successfully.",
                        response
                )
        );
    }

    @PatchMapping("/{cabinId}/activate")
    public ResponseEntity<ApiResponse<CabinResponse>> activateCabin(
            @PathVariable Long cabinId) {

        CabinResponse response =
                cabinService.activateCabin(cabinId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Cabin activated successfully.",
                        response
                )
        );
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<CabinResponse>>> getAvailableCabins() {

        List<CabinResponse> response =
                cabinService.getAvailableCabins();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Available cabins fetched successfully.",
                        response
                )
        );
    }
}
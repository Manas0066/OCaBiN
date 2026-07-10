package com.cabin.cabin_management_system.cabin.controller;

import com.cabin.cabin_management_system.cabin.dto.request.CabinRequest;
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
}
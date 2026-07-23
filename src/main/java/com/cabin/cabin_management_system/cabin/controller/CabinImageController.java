package com.cabin.cabin_management_system.cabin.controller;

import com.cabin.cabin_management_system.cabin.dto.response.CabinImageResponse;
import com.cabin.cabin_management_system.cabin.service.CabinImageService;
import com.cabin.cabin_management_system.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cabins")
@RequiredArgsConstructor
public class CabinImageController {

    private final CabinImageService cabinImageService;

    @PostMapping("/{cabinId}/images")
    public ResponseEntity<ApiResponse<List<CabinImageResponse>>> uploadImages(
            @PathVariable Long cabinId,
            @RequestParam("files") MultipartFile[] files
    ) {

        List<CabinImageResponse> uploadedImages = new ArrayList<>();

        for (MultipartFile file : files) {
            uploadedImages.add(cabinImageService.saveImage(cabinId, file));
        }

        ApiResponse<List<CabinImageResponse>> response =
                new ApiResponse<>(
                        true,
                        "Images uploaded successfully.",
                        uploadedImages
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{cabinId}/images")
    public ResponseEntity<ApiResponse<List<CabinImageResponse>>> getCabinImages(
            @PathVariable Long cabinId
    ) {

        ApiResponse<List<CabinImageResponse>> response =
                new ApiResponse<>(
                        true,
                        "Cabin images fetched successfully.",
                        cabinImageService.getCabinImages(cabinId)
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @PathVariable Long imageId
    ) {

        cabinImageService.deleteImage(imageId);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        true,
                        "Image deleted successfully.",
                        null
                );

        return ResponseEntity.ok(response);
    }
}
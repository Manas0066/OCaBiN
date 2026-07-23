package com.cabin.cabin_management_system.cabin.service;

import com.cabin.cabin_management_system.cabin.dto.response.CabinImageResponse;
import com.cabin.cabin_management_system.cabin.entity.Cabin;
import com.cabin.cabin_management_system.cabin.entity.CabinImage;
import com.cabin.cabin_management_system.cabin.repository.CabinImageRepository;
import com.cabin.cabin_management_system.cabin.repository.CabinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CabinImageService {

    private final CabinRepository cabinRepository;
    private final CabinImageRepository cabinImageRepository;
    private final FileStorageService fileStorageService;

    /**
     * Save a single image URL for a cabin.
     */
    public CabinImageResponse saveImage(Long cabinId, MultipartFile file) {

        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() -> new RuntimeException("Cabin not found."));

        String fileName = fileStorageService.saveFile(file);

        CabinImage image = new CabinImage();
        image.setImageUrl("/uploads/" + fileName);
        image.setCabin(cabin);

        CabinImage savedImage = cabinImageRepository.save(image);

        return new CabinImageResponse(
                savedImage.getId(),
                savedImage.getImageUrl()
        );
    }

    /**
     * Get all images of a cabin.
     */
    public List<CabinImageResponse> getCabinImages(Long cabinId) {

        if (!cabinRepository.existsById(cabinId)) {
            throw new RuntimeException("Cabin not found.");
        }

        return cabinImageRepository.findByCabinId(cabinId)
                .stream()
                .map(image -> new CabinImageResponse(
                        image.getId(),
                        image.getImageUrl()
                ))
                .toList();
    }

    /**
     * Delete image by ID.
     */
    public void deleteImage(Long imageId) {

        CabinImage image = cabinImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found."));

        cabinImageRepository.delete(image);
    }
}
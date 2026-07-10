package com.cabin.cabin_management_system.booking.controller;

import com.cabin.cabin_management_system.booking.dto.request.BookingRequest;
import com.cabin.cabin_management_system.booking.dto.response.BookingResponse;
import com.cabin.cabin_management_system.booking.service.BookingService;
import com.cabin.cabin_management_system.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @RequestBody BookingRequest request) {

        BookingResponse response = bookingService.createBooking(request);

        ApiResponse<BookingResponse> apiResponse =
                new ApiResponse<>(
                        true,
                        "Booking Created Successfully",
                        response
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getPendingBookings(){

        List<BookingResponse> response =
                bookingService.getPendingBookings();

        ApiResponse<List<BookingResponse>> apiResponse =
                new ApiResponse<>(
                        true,
                        "Pending bookings fetched successfully.",
                        response
                );

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings() {

        List<BookingResponse> response = bookingService.getAllBookings();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "All bookings fetched successfully.",
                        response
                )
        );
    }

    @PutMapping("/{bookingId}/approve")
    public ResponseEntity<ApiResponse<BookingResponse>> approveBooking(
            @PathVariable Long bookingId) {

        BookingResponse response = bookingService.approveBooking(bookingId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Booking Approved Successfully",
                        response
                )
        );
    }

    @PutMapping("/{bookingId}/reject")
    public ResponseEntity<ApiResponse<BookingResponse>> rejectBooking(
            @PathVariable Long bookingId) {

        BookingResponse response = bookingService.rejectBooking(bookingId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Booking Rejected Successfully",
                        response
                )
        );
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings() {

        List<BookingResponse> response =
                bookingService.getMyBookings();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Bookings fetched successfully.",
                        response
                )
        );
    }
}
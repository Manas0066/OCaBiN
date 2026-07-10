package com.cabin.cabin_management_system.dashboard.controller;

import com.cabin.cabin_management_system.booking.dto.response.BookingResponse;
import com.cabin.cabin_management_system.common.response.ApiResponse;
import com.cabin.cabin_management_system.dashboard.dto.response.DashboardResponse;
import com.cabin.cabin_management_system.dashboard.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboardStats() {

        DashboardResponse response =
                dashboardService.getDashboardStats();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Dashboard statistics fetched successfully.",
                        response
                )
        );
    }


    @GetMapping("/recent-bookings")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getRecentBookings() {

        List<BookingResponse> response =
                dashboardService.getRecentBookings();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Recent bookings fetched successfully.",
                        response
                )
        );
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getTodayBookings() {

        List<BookingResponse> response =
                dashboardService.getTodayBookings();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Today's bookings fetched successfully.",
                        response
                )
        );
    }
}
package com.cabin.cabin_management_system.dashboard.service;

import com.cabin.cabin_management_system.booking.dto.response.BookingResponse;
import com.cabin.cabin_management_system.booking.entity.Booking;
import com.cabin.cabin_management_system.booking.repository.BookingRepository;
import com.cabin.cabin_management_system.cabin.repository.CabinRepository;
import com.cabin.cabin_management_system.common.enums.BookingStatus;
import com.cabin.cabin_management_system.common.enums.CabinStatus;
import com.cabin.cabin_management_system.dashboard.dto.response.DashboardResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

    private final CabinRepository cabinRepository;
    private final BookingRepository bookingRepository;

    public DashboardService(CabinRepository cabinRepository,
                            BookingRepository bookingRepository) {

        this.cabinRepository = cabinRepository;
        this.bookingRepository = bookingRepository;
    }

    public DashboardResponse getDashboardStats() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalCabins(cabinRepository.count());

        response.setAvailableCabins(
                cabinRepository.countByStatus(CabinStatus.AVAILABLE)
        );

        response.setInactiveCabins(
                cabinRepository.countByActiveFalse()
        );

        response.setPendingBookings(
                bookingRepository.countByStatus(BookingStatus.PENDING)
        );

        response.setApprovedBookings(
                bookingRepository.countByStatus(BookingStatus.APPROVED)
        );

        response.setRejectedBookings(
                bookingRepository.countByStatus(BookingStatus.REJECTED)
        );

        return response;
    }

    public List<BookingResponse> getRecentBookings() {

        return bookingRepository.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToBookingResponse)
                .toList();
    }
    private BookingResponse convertToBookingResponse(Booking booking) {

        BookingResponse response = new BookingResponse();

        response.setId(booking.getId());
        response.setCabinName(booking.getCabin().getCabinName());
        response.setEmployeeName(booking.getUser().getName());

        response.setBookingDate(booking.getBookingDate());
        response.setStartTime(booking.getStartTime());
        response.setEndTime(booking.getEndTime());

        response.setPurpose(booking.getPurpose());
        response.setStatus(booking.getStatus());

        return response;
    }

    public List<BookingResponse> getTodayBookings() {

        return bookingRepository.findByBookingDate(LocalDate.now())
                .stream()
                .map(this::convertToBookingResponse)
                .toList();
    }
}
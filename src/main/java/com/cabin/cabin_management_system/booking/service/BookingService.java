package com.cabin.cabin_management_system.booking.service;

import com.cabin.cabin_management_system.auth.entity.User;
import com.cabin.cabin_management_system.booking.dto.request.BookingRequest;
import com.cabin.cabin_management_system.booking.dto.response.BookingResponse;
import com.cabin.cabin_management_system.booking.entity.Booking;
import com.cabin.cabin_management_system.booking.repository.BookingRepository;
import com.cabin.cabin_management_system.cabin.entity.Cabin;
import com.cabin.cabin_management_system.cabin.repository.CabinRepository;
import com.cabin.cabin_management_system.common.enums.BookingStatus;
import com.cabin.cabin_management_system.common.enums.CabinStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CabinRepository cabinRepository;
    @Value("${office.start.time}")
    private LocalTime officeStartTime;

    @Value("${office.end.time}")
    private LocalTime officeEndTime;

    public BookingService(BookingRepository bookingRepository,
                          CabinRepository cabinRepository) {
        this.bookingRepository = bookingRepository;
        this.cabinRepository = cabinRepository;
    }

    public BookingResponse createBooking(BookingRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        Cabin cabin = cabinRepository.findById(request.getCabinId())
                .orElseThrow(() -> new NoSuchElementException("Cabin not found."));

        validateBookingRequest(request, cabin);

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setCabin(cabin);

        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());

        booking.setPurpose(request.getPurpose());
        booking.setStatus(BookingStatus.PENDING);

        LocalDateTime now = LocalDateTime.now();

        booking.setCreatedAt(now);
        booking.setUpdatedAt(now);

        Booking savedBooking = bookingRepository.save(booking);

        return convertToBookingResponse(savedBooking);
    }

    public List<BookingResponse> getPendingBookings() {

        return bookingRepository.findByStatus(BookingStatus.PENDING)
                .stream()
                .map(this::convertToBookingResponse)
                .toList();
    }

    public BookingResponse approveBooking(Long bookingId) {
        return updateBookingStatus(bookingId, BookingStatus.APPROVED);
    }

    public BookingResponse rejectBooking(Long bookingId) {
        return updateBookingStatus(bookingId, BookingStatus.REJECTED);
    }

    public List<BookingResponse> getMyBookings() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        return bookingRepository.findByUser(user)
                .stream()
                .map(this::convertToBookingResponse)
                .toList();
    }

    public List<BookingResponse> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(this::convertToBookingResponse)
                .toList();
    }

    private BookingResponse updateBookingStatus(Long bookingId,
                                                BookingStatus status) {

        Booking booking = findBookingById(bookingId);

        validatePendingBooking(booking);

        // Check for conflicts only while approving
        if (status == BookingStatus.APPROVED) {

            validateBookingConflict(
                    booking.getCabin().getId(),
                    booking.getBookingDate(),
                    booking.getStartTime(),
                    booking.getEndTime(),
                    booking.getId()
            );
        }

        booking.setStatus(status);
        booking.setUpdatedAt(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        return convertToBookingResponse(savedBooking);
    }

    private Booking findBookingById(Long bookingId) {

        return bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new NoSuchElementException("Booking not found."));
    }

    private void validatePendingBooking(Booking booking) {

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Booking has already been processed.");
        }
    }

    private void validateBookingRequest(BookingRequest request,
                                        Cabin cabin) {

        if (!cabin.getActive()) {
            throw new IllegalArgumentException("Cabin is inactive.");
        }

        if (cabin.getStatus() != CabinStatus.AVAILABLE) {
            throw new IllegalArgumentException("Cabin is not available.");
        }

        if (request.getBookingDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "Past date booking is not allowed.");
        }

        if (request.getBookingDate().isAfter(LocalDate.now().plusDays(7))) {
            throw new IllegalArgumentException(
                    "Booking can only be made within next 7 days.");
        }

        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new IllegalArgumentException(
                    "End time must be after start time.");
        }

        if (request.getStartTime().isBefore(officeStartTime)
                || request.getEndTime().isAfter(officeEndTime)) {

            throw new IllegalArgumentException(
                    "Booking time must be within office hours.");
        }

        if (request.getBookingDate().isEqual(LocalDate.now())) {

            LocalDateTime bookingStart =
                    LocalDateTime.of(
                            request.getBookingDate(),
                            request.getStartTime()
                    );

            if (!bookingStart.isAfter(LocalDateTime.now())) {
                throw new IllegalArgumentException(
                        "Booking must be scheduled for a future time."
                );
            }
        }
    }

    private void validateBookingConflict(
            Long cabinId,
            LocalDate bookingDate,
            LocalTime startTime,
            LocalTime endTime,
            Long currentBookingId) {

        List<Booking> approvedBookings =
                bookingRepository.findByCabinIdAndBookingDateAndStatus(
                        cabinId,
                        bookingDate,
                        BookingStatus.APPROVED
                );

        for (Booking booking : approvedBookings) {

            // Skip current booking (important during approval)
            if (currentBookingId != null &&
                    booking.getId().equals(currentBookingId)) {
                continue;
            }

            boolean overlap =
                    startTime.isBefore(booking.getEndTime())
                            && endTime.isAfter(booking.getStartTime());

            if (overlap) {
                throw new IllegalArgumentException(
                        "Cabin is already booked for the selected time."
                );
            }
        }
    }

    public BookingResponse cancelBooking(Long bookingId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new NoSuchElementException("Booking not found."));

        // Employee can cancel only his own booking
        validateBookingOwnership(booking, currentUser);

        // Only pending booking can be cancelled
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Only pending bookings can be cancelled.");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        booking.setUpdatedAt(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        return convertToBookingResponse(savedBooking);
    }

    private void validateBookingOwnership(Booking booking, User currentUser) {

        if (!booking.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException(
                    "You are not allowed to access this booking."
            );
        }
    }

    public BookingResponse getBookingById(Long bookingId) {

        Booking booking = findBookingById(bookingId);

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        boolean isAdminOrManager =
                currentUser.getRole().name().equals("ADMIN")
                        || currentUser.getRole().name().equals("MANAGER");

        if (!isAdminOrManager) {
            validateBookingOwnership(booking, currentUser);
        }

        return convertToBookingResponse(booking);
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
}
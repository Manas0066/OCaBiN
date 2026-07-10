package com.cabin.cabin_management_system.booking.repository;

import com.cabin.cabin_management_system.auth.entity.User;
import com.cabin.cabin_management_system.booking.entity.Booking;
import com.cabin.cabin_management_system.common.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByCabinIdAndBookingDateAndStatus(
            Long cabinId,
            LocalDate bookingDate,
            BookingStatus status
    );
    List<Booking> findByUser(User user);
    long countByStatus(BookingStatus status);

    List<Booking> findTop5ByOrderByCreatedAtDesc();

    List<Booking> findByBookingDate(LocalDate bookingDate);
}
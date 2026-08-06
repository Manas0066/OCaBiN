package com.cabin.cabin_management_system.booking.service;

import com.cabin.cabin_management_system.booking.dto.availability.BookingAvailabilityResponse;
import com.cabin.cabin_management_system.booking.dto.availability.TimeSlotResponse;
import com.cabin.cabin_management_system.booking.entity.Booking;
import com.cabin.cabin_management_system.booking.repository.BookingRepository;
import com.cabin.cabin_management_system.cabin.entity.Cabin;
import com.cabin.cabin_management_system.cabin.repository.CabinRepository;
import com.cabin.cabin_management_system.common.enums.BookingStatus;
import com.cabin.cabin_management_system.common.enums.SlotType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CabinAvailabilityService {

    private final BookingRepository bookingRepository;
    private final CabinRepository cabinRepository;

    @Value("${office.start.time}")
    private LocalTime officeStartTime;

    @Value("${office.end.time}")
    private LocalTime officeEndTime;

    public CabinAvailabilityService(
            BookingRepository bookingRepository,
            CabinRepository cabinRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.cabinRepository = cabinRepository;
    }

    public BookingAvailabilityResponse getTodayAvailability(Long cabinId) {

        Cabin cabin = cabinRepository.findById(cabinId)
                .orElseThrow(() ->
                        new NoSuchElementException("Cabin not found."));

        List<Booking> bookings =
                bookingRepository.findByCabinIdAndBookingDateAndStatusOrderByStartTimeAsc(
                        cabin.getId(),
                        LocalDate.now(),
                        BookingStatus.APPROVED
                );

        BookingAvailabilityResponse response =
                new BookingAvailabilityResponse();

        response.setCabinId(cabin.getId());
        response.setCabinName(cabin.getCabinName());
        
        List<TimeSlotResponse> schedule = new ArrayList<>();

        LocalTime pointer = officeStartTime;

        LocalTime now = LocalTime.now();

        boolean occupied = false;
        LocalTime occupiedUntil = null;

        for (Booking booking : bookings) {

            LocalTime bookingStart = booking.getStartTime();
            LocalTime bookingEnd = booking.getEndTime();

            // Ignore bookings completely outside office hours
            if (bookingEnd.compareTo(officeStartTime) <= 0 ||
                    bookingStart.compareTo(officeEndTime) >= 0) {
                continue;
            }

            // Clip to office hours
            if (bookingStart.isBefore(officeStartTime)) {
                bookingStart = officeStartTime;
            }

            if (bookingEnd.isAfter(officeEndTime)) {
                bookingEnd = officeEndTime;
            }

            // Available slot before booking
            if (pointer.isBefore(bookingStart)) {
                schedule.add(new TimeSlotResponse(
                        pointer,
                        bookingStart,
                        SlotType.AVAILABLE
                ));
            }

            if (bookingStart.isBefore(pointer)) {
                bookingStart = pointer;
            }

            if (!bookingStart.isBefore(bookingEnd)) {
                continue;
            }

            // Booked slot
            schedule.add(new TimeSlotResponse(
                    bookingStart,
                    bookingEnd,
                    SlotType.BOOKED
            ));

            // Occupancy check
            if (!now.isBefore(bookingStart) &&
                    now.isBefore(bookingEnd)) {

                occupied = true;
                occupiedUntil = bookingEnd;
            }

            pointer = bookingEnd;
        }

        /*
         * Remaining office hours
         */
        if (pointer.isBefore(officeEndTime)) {

            schedule.add(
                    new TimeSlotResponse(
                            pointer,
                            officeEndTime,
                            SlotType.AVAILABLE
                    )
            );
        }

        response.setCurrentlyOccupied(occupied);
        response.setOccupiedUntil(occupiedUntil);
        response.setTodaySchedule(schedule);

        return response;
    }
}
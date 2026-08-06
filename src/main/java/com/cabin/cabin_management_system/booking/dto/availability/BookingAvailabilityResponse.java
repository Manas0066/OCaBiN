package com.cabin.cabin_management_system.booking.dto.availability;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BookingAvailabilityResponse {

    private Long cabinId;

    private String cabinName;

    private boolean currentlyOccupied;

    private LocalTime occupiedUntil;

    private List<TimeSlotResponse> todaySchedule;
}
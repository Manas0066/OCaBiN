package com.cabin.cabin_management_system.booking.dto.availability;

import com.cabin.cabin_management_system.common.enums.SlotType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlotResponse {

    private LocalTime startTime;

    private LocalTime endTime;

    private SlotType slotType;
}
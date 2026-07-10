package com.cabin.cabin_management_system.booking.dto.response;

import com.cabin.cabin_management_system.common.enums.BookingStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingResponse {

    private Long id;

    private String cabinName;

    private String employeeName;

    private LocalDate bookingDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String purpose;

    private BookingStatus status;
}
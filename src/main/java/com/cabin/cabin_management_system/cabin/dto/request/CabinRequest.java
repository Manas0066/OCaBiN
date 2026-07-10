package com.cabin.cabin_management_system.cabin.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CabinRequest {

    private String cabinName;

    private Integer floor;

    private Integer capacity;

    private String location;

    private List<String> amenities;
}
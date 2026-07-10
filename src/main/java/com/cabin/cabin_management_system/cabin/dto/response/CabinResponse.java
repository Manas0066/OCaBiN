package com.cabin.cabin_management_system.cabin.dto.response;

import com.cabin.cabin_management_system.common.enums.CabinStatus;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CabinResponse {

    private Long id;

    private String cabinName;

    private Integer floor;

    private Integer capacity;

    private String location;

    private List<String> amenities;

    private CabinStatus status;

    private Boolean active;
}
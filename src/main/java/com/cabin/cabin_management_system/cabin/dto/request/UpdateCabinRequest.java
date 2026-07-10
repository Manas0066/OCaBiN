package com.cabin.cabin_management_system.cabin.dto.request;

import com.cabin.cabin_management_system.common.enums.CabinStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class UpdateCabinRequest {

    @NotBlank
    private String cabinName;

    @NotNull
    @Min(1)
    private Integer floor;

    @NotNull
    @Min(1)
    private Integer capacity;

    @NotBlank
    private String location;

    private List<String> amenities;

    @NotNull
    private CabinStatus status;

    @NotNull
    private Boolean active;

    // Getters & Setters

    public String getCabinName() {
        return cabinName;
    }

    public void setCabinName(String cabinName) {
        this.cabinName = cabinName;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public CabinStatus getStatus() {
        return status;
    }

    public void setStatus(CabinStatus status) {
        this.status = status;
    }
}
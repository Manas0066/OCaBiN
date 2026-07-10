package com.cabin.cabin_management_system.dashboard.dto.response;

public class DashboardResponse {

    private long totalCabins;

    private long availableCabins;

    private long inactiveCabins;

    private long pendingBookings;

    private long approvedBookings;

    private long rejectedBookings;

    // Getters & Setters

    public long getTotalCabins() {
        return totalCabins;
    }

    public void setTotalCabins(long totalCabins) {
        this.totalCabins = totalCabins;
    }

    public long getAvailableCabins() {
        return availableCabins;
    }

    public void setAvailableCabins(long availableCabins) {
        this.availableCabins = availableCabins;
    }

    public long getInactiveCabins() {
        return inactiveCabins;
    }

    public void setInactiveCabins(long inactiveCabins) {
        this.inactiveCabins = inactiveCabins;
    }

    public long getApprovedBookings() {
        return approvedBookings;
    }

    public void setApprovedBookings(long approvedBookings) {
        this.approvedBookings = approvedBookings;
    }

    public long getPendingBookings() {
        return pendingBookings;
    }

    public void setPendingBookings(long pendingBookings) {
        this.pendingBookings = pendingBookings;
    }

    public long getRejectedBookings() {
        return rejectedBookings;
    }

    public void setRejectedBookings(long rejectedBookings) {
        this.rejectedBookings = rejectedBookings;
    }
}
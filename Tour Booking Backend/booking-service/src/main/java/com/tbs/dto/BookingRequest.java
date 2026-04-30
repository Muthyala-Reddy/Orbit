package com.tbs.dto;

public class BookingRequest {

    private Long userId;
    private Long tourId;
    private Integer numberOfPeople;
    private Double totalAmount;

    public BookingRequest() {
    }

    public Long getUserId() { return userId; }
    public Long getTourId() { return tourId; }
    public Integer getNumberOfPeople() { return numberOfPeople; }
    public Double getTotalAmount() { return totalAmount; }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTourId(Long tourId) {
        this.tourId = tourId;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
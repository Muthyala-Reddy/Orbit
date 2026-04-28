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
}
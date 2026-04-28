package com.tbs.dto;

import java.time.LocalDateTime;

public class BookingResponse {

    private Long id;
    private Long userId;
    private Long tourId;
    private Integer numberOfPeople;
    private Double totalAmount;
    private String status;
    private LocalDateTime bookingDate;

    public BookingResponse(Long id, Long userId, Long tourId, Integer numberOfPeople,
                           Double totalAmount, String status, LocalDateTime bookingDate) {
        this.id = id;
        this.userId = userId;
        this.tourId = tourId;
        this.numberOfPeople = numberOfPeople;
        this.totalAmount = totalAmount;
        this.status = status;
        this.bookingDate = bookingDate;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getTourId() { return tourId; }
    public Integer getNumberOfPeople() { return numberOfPeople; }
    public Double getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public LocalDateTime getBookingDate() { return bookingDate; }
}
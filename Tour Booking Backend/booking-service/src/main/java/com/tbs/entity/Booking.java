package com.tbs.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long tourId;

    private Integer numberOfPeople;

    private Double totalAmount;

    private String status;

    private LocalDateTime bookingDate;

    public Booking() {
    }

    public Booking(Long userId, Long tourId, Integer numberOfPeople, Double totalAmount, String status) {
        this.userId = userId;
        this.tourId = tourId;
        this.numberOfPeople = numberOfPeople;
        this.totalAmount = totalAmount;
        this.status = status;
    }

    @PrePersist
    public void onCreate() {
        this.bookingDate = LocalDateTime.now();
        if (this.status == null) {
            this.status = "CREATED";
        }
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getTourId() { return tourId; }
    public Integer getNumberOfPeople() { return numberOfPeople; }
    public Double getTotalAmount() { return totalAmount; }
    public String getStatus() { return status; }
    public LocalDateTime getBookingDate() { return bookingDate; }

    public void setStatus(String status) {
        this.status = status;
    }
}
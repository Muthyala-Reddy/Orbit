package com.tbs.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;
    private Double amount;
    private String paymentMethod;
    private String status;

    private LocalDateTime paymentDate;

    public Payment() {
    }

    public Payment(Long bookingId, Double amount, String paymentMethod, String status) {
        this.bookingId = bookingId;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }

    @PrePersist
    public void onCreate() {
        this.paymentDate = LocalDateTime.now();
        if (this.status == null) {
            this.status = "SUCCESS";
        }
    }

    public Long getId() { return id; }
    public Long getBookingId() { return bookingId; }
    public Double getAmount() { return amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getStatus() { return status; }
    public LocalDateTime getPaymentDate() { return paymentDate; }
}

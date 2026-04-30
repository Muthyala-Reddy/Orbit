package com.tbs.dto;

public class PaymentRequest {

    private Long bookingId;
    private Double amount;
    private String paymentMethod;

    public PaymentRequest() {
    }

    public Long getBookingId() { return bookingId; }
    public Double getAmount() { return amount; }
    public String getPaymentMethod() { return paymentMethod; }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
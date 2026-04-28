package com.tbs.controller;

import com.tbs.dto.PaymentRequest;
import com.tbs.dto.PaymentResponse;
import com.tbs.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
//@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public PaymentResponse pay(@RequestBody PaymentRequest request) {
        return paymentService.makePayment(request);
    }

    @GetMapping("/booking/{bookingId}")
    public PaymentResponse getByBooking(@PathVariable Long bookingId) {
        return paymentService.getPaymentByBookingId(bookingId);
    }
}
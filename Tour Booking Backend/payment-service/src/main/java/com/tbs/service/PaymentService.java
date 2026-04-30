package com.tbs.service;

import com.tbs.dto.PaymentRequest;
import com.tbs.dto.PaymentResponse;
import com.tbs.entity.Payment;
import com.tbs.exception.PaymentNotFoundException;
import com.tbs.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public PaymentResponse makePayment(PaymentRequest request) {

        Payment payment = new Payment(
                request.getBookingId(),
                request.getAmount(),
                request.getPaymentMethod(),
                "SUCCESS"
        );

        Payment saved = paymentRepository.save(payment);

        return mapToResponse(saved);
    }

    public PaymentResponse getPaymentByBookingId(Long bookingId) {

        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found"));

        return mapToResponse(payment);
    }

    private PaymentResponse mapToResponse(Payment p) {
        return new PaymentResponse(
                p.getId(),
                p.getBookingId(),
                p.getAmount(),
                p.getPaymentMethod(),
                p.getStatus(),
                p.getPaymentDate()
        );
    }
}

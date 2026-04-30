package com.tbs;

import com.tbs.dto.PaymentRequest;
import com.tbs.dto.PaymentResponse;
import com.tbs.entity.Payment;
import com.tbs.exception.PaymentNotFoundException;
import com.tbs.repository.PaymentRepository;
import com.tbs.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class
PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentService paymentService;


    @Test
    void testMakePayment() {

        PaymentRequest request = new PaymentRequest();
        // request values are not mandatory for this unit test

        Payment savedPayment = new Payment(
                10L,
                30000.0,
                "UPI",
                "SUCCESS"
        );

        when(paymentRepository.save(any(Payment.class)))
                .thenReturn(savedPayment);

        PaymentResponse response = paymentService.makePayment(request);

        assertThat(response.getStatus()).isEqualTo("SUCCESS");
        assertThat(response.getAmount()).isEqualTo(30000.0);
    }


    @Test
    void testGetPaymentByBookingId() {

        Payment payment = new Payment(
                10L,
                30000.0,
                "CARD",
                "SUCCESS"
        );

        when(paymentRepository.findByBookingId(10L))
                .thenReturn(Optional.of(payment));

        PaymentResponse response =
                paymentService.getPaymentByBookingId(10L);

        assertThat(response.getBookingId()).isEqualTo(10L);
        assertThat(response.getStatus()).isEqualTo("SUCCESS");
    }


    @Test
    void testPaymentNotFoundException() {

        when(paymentRepository.findByBookingId(99L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                paymentService.getPaymentByBookingId(99L)
        ).isInstanceOf(PaymentNotFoundException.class)
         .hasMessage("Payment not found");
    }
}
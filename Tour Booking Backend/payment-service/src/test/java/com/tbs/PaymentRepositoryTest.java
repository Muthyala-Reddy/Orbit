package com.tbs;

import com.tbs.entity.Payment;
import com.tbs.repository.PaymentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class PaymentRepositoryTest {

    @Autowired
    private PaymentRepository paymentRepository;

    @Test
    void testFindByBookingId() {

        // Given: save payment data
        Payment payment = new Payment(
                10L,
                30000.0,
                "UPI",
                "SUCCESS"
        );

        paymentRepository.save(payment);

        //  When: find by bookingId
        Optional<Payment> result =
                paymentRepository.findByBookingId(10L);

        // Then: validate
        assertThat(result).isPresent();
        assertThat(result.get().getBookingId()).isEqualTo(10L);
        assertThat(result.get().getStatus()).isEqualTo("SUCCESS");
    }
}
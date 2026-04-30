package com.tbs;

import com.tbs.entity.Booking;
import com.tbs.repository.BookingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class BookingRepositoryTest {

    @Autowired
    private BookingRepository bookingRepository;

    @Test
    void testFindByUserId() {

        //   create booking records
        Booking booking1 = new Booking(
                1L,
                101L,
                2,
                30000.0,
                "CONFIRMED"
        );

        Booking booking2 = new Booking(
                1L,
                102L,
                1,
                15000.0,
                "PENDING"
        );

        Booking booking3 = new Booking(
                2L,
                103L,
                3,
                45000.0,
                "CREATED"
        );

        bookingRepository.save(booking1);
        bookingRepository.save(booking2);
        bookingRepository.save(booking3);

        //  When: fetch bookings for userId = 1
        List<Booking> bookings =
                bookingRepository.findByUserId(1L);

        // Then: validate result
        assertThat(bookings).hasSize(2);
        assertThat(bookings.get(0).getUserId()).isEqualTo(1L);
        assertThat(bookings.get(1).getUserId()).isEqualTo(1L);
    }
}

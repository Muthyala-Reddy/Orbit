package com.tbs;

import com.tbs.dto.BookingRequest;
import com.tbs.dto.BookingResponse;
import com.tbs.entity.Booking;
import com.tbs.repository.BookingRepository;
import com.tbs.service.BookingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingService bookingService;

    //  1. Test createBooking()
    @Test
    void testCreateBooking() {

        BookingRequest request = new BookingRequest();
        // getters values are not used directly in test

        Booking savedBooking = new Booking(
                1L,
                100L,
                2,
                30000.0,
                "CREATED"
        );

        // simulate DB generated values
        savedBooking.setStatus("CREATED");

        when(bookingRepository.save(any(Booking.class)))
                .thenReturn(savedBooking);

        BookingResponse response = bookingService.createBooking(request);

        assertThat(response.getStatus()).isEqualTo("CREATED");
        assertThat(response.getTotalAmount()).isEqualTo(30000.0);
    }

    // 2. Test getBookingsByUser()
    @Test
    void testGetBookingsByUser() {

        Booking booking1 = new Booking(1L, 100L, 2, 30000.0, "CONFIRMED");
        Booking booking2 = new Booking(1L, 101L, 1, 15000.0, "PENDING");

        when(bookingRepository.findByUserId(1L))
                .thenReturn(List.of(booking1, booking2));

        List<BookingResponse> responses =
                bookingService.getBookingsByUser(1L);

        assertThat(responses).hasSize(2);
        assertThat(responses.get(0).getStatus()).isEqualTo("CONFIRMED");
        assertThat(responses.get(1).getStatus()).isEqualTo("PENDING");
    }

    //  3. Test getBookingById()
    @Test
    void testGetBookingById() {

        Booking booking = new Booking(
                1L,
                100L,
                2,
                30000.0,
                "CONFIRMED"
        );

        when(bookingRepository.findById(1L))
                .thenReturn(Optional.of(booking));

        BookingResponse response = bookingService.getBookingById(1L);

        assertThat(response.getStatus()).isEqualTo("CONFIRMED");
        assertThat(response.getTotalAmount()).isEqualTo(30000.0);
    }
}
package com.tbs.service;

import com.tbs.dto.BookingRequest;
import com.tbs.dto.BookingResponse;
import com.tbs.entity.Booking;
import com.tbs.exception.BookingNotFoundException;
import com.tbs.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public BookingResponse createBooking(BookingRequest request) {

        Booking booking = new Booking(
                request.getUserId(),
                request.getTourId(),
                request.getNumberOfPeople(),
                request.getTotalAmount(),
                "CREATED"
        );

        Booking saved = bookingRepository.save(booking);

        return mapToResponse(saved);
    }

    public List<BookingResponse> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public BookingResponse getBookingById(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking Not Found"));

        return mapToResponse(booking);
    }

    private BookingResponse mapToResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getUserId(),
                booking.getTourId(),
                booking.getNumberOfPeople(),
                booking.getTotalAmount(),
                booking.getStatus(),
                booking.getBookingDate()
        );
    }
}
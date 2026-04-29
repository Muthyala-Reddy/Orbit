package com.tbs.controller;

import com.tbs.dto.BookingRequest;
import com.tbs.dto.BookingResponse;
import com.tbs.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")

public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public BookingResponse create(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }

    @GetMapping("/{id}")
    public BookingResponse getById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }
}
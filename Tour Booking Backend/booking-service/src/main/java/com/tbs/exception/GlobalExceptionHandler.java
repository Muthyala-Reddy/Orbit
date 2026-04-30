package com.tbs.exception;

import com.tbs.util.ResponseMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookingNotFoundException.class)
    public ResponseEntity<ResponseMessage> handleBookingNotFound(BookingNotFoundException e) {

        return ResponseEntity
                .status(404)
                .body(new ResponseMessage(e.getMessage()));
    }
}

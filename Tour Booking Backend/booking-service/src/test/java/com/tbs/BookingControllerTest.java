package com.tbs;
import com.tbs.controller.BookingController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tbs.dto.BookingRequest;
import com.tbs.dto.BookingResponse;
import com.tbs.service.BookingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class BookingControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private BookingService bookingService;

	@Autowired
	private ObjectMapper objectMapper;

	// 1) POST /api/bookings
	@Test
	void testCreateBooking() throws Exception {

		BookingRequest request = new BookingRequest();
		request.setUserId(10L);
		request.setTourId(100L);
		request.setNumberOfPeople(2);
		request.setTotalAmount(30000.0);

		BookingResponse response = new BookingResponse(
				1L, 10L, 100L, 2, 30000.0, "CREATED", LocalDateTime.now()
		);

		when(bookingService.createBooking(any(BookingRequest.class)))
				.thenReturn(response);

		mockMvc.perform(post("/api/bookings")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.userId").value(10))
				.andExpect(jsonPath("$.tourId").value(100))
				.andExpect(jsonPath("$.numberOfPeople").value(2))
				.andExpect(jsonPath("$.totalAmount").value(30000.0))
				.andExpect(jsonPath("$.status").value("CREATED"));

	}

	//  2) GET /api/bookings/user/{userId}
	@Test
	void testGetBookingsByUser() throws Exception {

		BookingResponse b1 = new BookingResponse(
				1L, 10L, 100L, 2, 30000.0, "CONFIRMED", LocalDateTime.now()
		);
		BookingResponse b2 = new BookingResponse(
				2L, 10L, 101L, 1, 15000.0, "PENDING", LocalDateTime.now()
		);

		when(bookingService.getBookingsByUser(10L))
				.thenReturn(List.of(b1, b2));

		mockMvc.perform(get("/api/bookings/user/10"))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.length()").value(2))
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].status").value("CONFIRMED"))
				.andExpect(jsonPath("$[1].id").value(2))
				.andExpect(jsonPath("$[1].status").value("PENDING"));
	}

	//  3) GET /api/bookings/{id}
	@Test
	void testGetBookingById() throws Exception {

		BookingResponse response = new BookingResponse(
				1L, 10L, 100L, 2, 30000.0, "CONFIRMED", LocalDateTime.now()
		);

		when(bookingService.getBookingById(1L))
				.thenReturn(response);

		mockMvc.perform(get("/api/bookings/1"))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.status").value("CONFIRMED"));
	}
}

package com.tbs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tbs.dto.PaymentRequest;
import com.tbs.dto.PaymentResponse;
import com.tbs.service.PaymentService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PaymentControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private PaymentService paymentService;

	@Autowired
	private ObjectMapper objectMapper;

	// 1. Test MAKE PAYMENT
	@Test
	void testMakePayment() throws Exception {

		PaymentRequest request = new PaymentRequest();
		request.setBookingId(10L);
		request.setAmount(30000.0);
		request.setPaymentMethod("UPI");

		PaymentResponse response = new PaymentResponse(
				1L,
				10L,
				30000.0,
				"UPI",
				"SUCCESS",
				LocalDateTime.now()
		);

		when(paymentService.makePayment(any(PaymentRequest.class)))
				.thenReturn(response);

		mockMvc.perform(post("/api/payments")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value("SUCCESS"))
				.andExpect(jsonPath("$.amount").value(30000.0));
	}
	// 2. Test GET PAYMENT BY BOOKING ID
	@Test
	void testGetPaymentByBookingId() throws Exception {

		PaymentResponse response = new PaymentResponse(
				1L,
				10L,
				30000.0,
				"CARD",
				"SUCCESS",
				LocalDateTime.now()
		);

		when(paymentService.getPaymentByBookingId(10L))
				.thenReturn(response);

		mockMvc.perform(get("/api/payments/booking/10"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.bookingId").value(10))
				.andExpect(jsonPath("$.status").value("SUCCESS"));
	}
}

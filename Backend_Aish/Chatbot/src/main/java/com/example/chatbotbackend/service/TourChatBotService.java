package com.example.chatbotbackend.service;

import org.springframework.stereotype.Service;
@Service
public class TourChatBotService {

    public String getReply(String message) {

        message = message.toLowerCase();

        // Greetings
        if (message.contains("hi") || message.contains("hello")) {
            return "Hello! Welcome to Orbit. I can help you with any doubts regarding to tours.";
        }

        // Shimla tour info
        if (message.contains("shimla")) {
            return """
                   🏔️ Shimla Tour (5 Days / 4 Nights)
                   💰 Cost: ₹25,000 per person

                   Day 1: Arrival and Mall Road visit
                   Day 2: Kufri sightseeing
                   Day 3: Jakhoo Temple and Ridge
                   Day 4: Local shopping
                   Day 5: Departure
                   """;
        }

        // Manali tour info
        if (message.contains("manali")) {
            return """
                   🏞️ Manali Tour (6 Days / 5 Nights)
                   💰 Cost: ₹30,000 per person

                   Day 1: Arrival and rest
                   Day 2: Solang Valley
                   Day 3: Rohtang Pass
                   Day 4: Hadimba Temple
                   Day 5: Local markets
                   Day 6: Departure
                   """;
        }

        // Cost related
        if (message.contains("cost") || message.contains("price")) {
            return "Shimla Tour costs ₹25,000 and Manali Tour costs ₹30,000 per person.";
        }

        // Days / Nights
        if (message.contains("days") || message.contains("nights")) {
            return "Shimla: 5 Days / 4 Nights, Manali: 6 Days / 5 Nights.";
        }

        // Booking info
        if (message.contains("book")) {
            return "To book a tour, please select the tour from the dashboard and proceed with payment.";
        }

        // Fallback
        return "Sorry, I didn’t understand that. You can ask about Shimla tour, Manali tour, cost, or itinerary.";
    }
}

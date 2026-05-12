package com.example.service;

import org.springframework.stereotype.Service;

@Service
public class RuleBasedChatBotService {

    public String getReply(String message) {

        if (message == null || message.trim().isEmpty()) {
            return "Please type a message 🙂";
        }

        String msg = message.toLowerCase();

        if (msg.contains("hello") || msg.contains("hi")) {
            return "Hello 👋 How can I help you today?";
        }

        if (msg.contains("packages")) {
            return "We offer domestic and international tour packages.";
        }

        if (msg.contains("booking")) {
            return "You can book tours from the Packages page.";
        }

        if (msg.contains("price")) {
            return "Prices depend on the destination and duration.";
        }

        return "Sorry, I didn't understand that. Please ask about tours.";
    }
}
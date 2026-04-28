package com.example.chatbotbackend.service;

import org.springframework.stereotype.Service;

@Service
public class LLMTourChatService {

    private final ChatClient chatClient;

    public LLMTourChatService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String getReply(String userMessage) {

        String systemPrompt = """
        You are a tour booking assistant.
        Provide information about tours like Shimla and Manali.
        Always include:
        - Cost
        - Number of days and nights
        - Day-wise itinerary
        Respond clearly and professionally.
        """;

        return chatClient
                .prompt()
                .system(systemPrompt)
                .user(userMessage)
                .call()
                .content();
    }
}


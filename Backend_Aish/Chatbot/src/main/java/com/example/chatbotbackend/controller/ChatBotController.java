package com.example.chatbotbackend.controller;

import com.example.chatbotbackend.model.ChatRequest;
import com.example.chatbotbackend.service.TourChatBotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatBotController {

    private final TourChatBotService chatBotService;

    public ChatBotController(TourChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping
    public String chat(@RequestBody ChatRequest request) {
        return chatBotService.getReply(request.getMessage());
    }
}


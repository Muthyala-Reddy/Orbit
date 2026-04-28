package com.example.chatbotbackend.controller;

import com.example.chatbotbackend.model.ChatRequest;
import com.example.chatbotbackend.service.LLMTourChatService;
import com.example.chatbotbackend.service.TourChatBotService;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatBotController {

    private final LLMTourChatService chatService;

    public ChatBotController(LLMTourChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public String chat(@RequestBody ChatRequest request) {
        return chatService.getReply(request.getMessage());
    }
}

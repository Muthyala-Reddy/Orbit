package com.example.controller;

import com.example.model.ChatRequest;
import com.example.service.RuleBasedChatBotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatbotController {

    private final RuleBasedChatBotService chatBotService;

    public ChatbotController(RuleBasedChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping
    public String chat(@RequestBody ChatRequest request) {
        return chatBotService.getReply(request.getMessage());
    }
}
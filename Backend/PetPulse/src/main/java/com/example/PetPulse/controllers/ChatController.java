package com.example.PetPulse.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/chat")
public class ChatController {

    @Value("${rasa.server.url}")
    private String rasaServerUrl;

    private final RestTemplate restTemplate;

    @Autowired
    public ChatController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/")
    public String index() {
        return "Chatbot is up and running!";
    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity<?> chat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        Map<String, String> body = new HashMap<>();
        body.put("message", userMessage);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(rasaServerUrl + "/webhooks/rest/webhook", HttpMethod.POST, requestEntity, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}

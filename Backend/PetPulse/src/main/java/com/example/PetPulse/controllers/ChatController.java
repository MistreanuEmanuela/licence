package com.example.PetPulse.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.AccessToken;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/chat")
public class ChatController {


    @GetMapping("/token")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public String getToken() {
        try {
            File file = new File("chatbotproject-425609-ec9a94d2a7d3.json");
            FileInputStream serviceAccountStream = new FileInputStream("D:\\licence\\licence\\Backend\\PetPulse\\src\\main\\java\\com\\example\\PetPulse\\controllers\\chatbotproject-425609-ec9a94d2a7d3.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccountStream)
                    .createScoped("https://www.googleapis.com/auth/cloud-platform");
            AccessToken accessToken = credentials.refreshAccessToken();
            serviceAccountStream.close();
            return accessToken.getTokenValue();
        } catch (IOException e) {
            System.err.println("Failed to read the service account file: " + e.getMessage());
        }
        return "None";
    }
}

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

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/chat")
public class ChatController {


    @GetMapping("/token")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public String getToken() {
//        try {
//            String[] command = {"python", "D:\\licence\\licence\\Additionally programs\\ChatBot\\tokenFromGoogle\\token\\main.py"};
//            ProcessBuilder processBuilder = new ProcessBuilder(command);
//
//            Process process = processBuilder.start();
//
//            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//            StringBuilder output = new StringBuilder();
//            String line;
//            while ((line = reader.readLine()) != null) {
//                output.append(line);
//            }
//
//            int exitCode = process.waitFor();
//            if (exitCode == 0) {
//                System.out.println(output.toString());
//                return output.toString();
//            } else {
//                return "Error: Python script exited with code " + exitCode;
//            }
//        } catch (Exception e) {
//            return "Error executing Python script: " + e.getMessage();
//        }
//    }
        return "ya29.c.c0AY_VpZhtrdrS0g6oCCljlidsVVYzw57jLOLHipXPX7ALQOvjia56L6xhcBvpGrmGkuFNARURZ0GfbekLnyrbN1RRJEG7zYNKDP8c2Lz1_1-m2BhDz-FC3hkLAJDIMrxWkLhtiCmUQaZKOnH6BBtf-1iua0MYKUfQVAq93ZltzBXpWgqdnq85-0ai3AI7f03dakd21QNufVM1646N6LiPcnEOrvCgJpyssWkJ6X7zDCAIpazxRGjAAAKZQXd1fPQS4ntPfSxswfwuy1PZMYTkpPEI4JsHk5QHuNv7mx_THBOednffJmM8kRNHlJA1mmycSXc8q7mDwW5NLNFqXUjFOqMhEUp9vMlALDtn4Ww9Syzo47zrUnBjSIfMN385PyX_hX5W_paSabaqW0i0tIwO1UidtzFftztgoUscw6mOQxVeRvFoQphszOVnq1a0r2erknlj5kihvqBBVJV6nB9vn78ZuBJVuvvm5Ra2ehSbo8pt0hq_wFdtoF5poUs5rYQO-iqvItpohqlvlujX7J71lcw6u7p7d8lesr145yhyZjek58s3F_y0kanpO9s4R5ybbVdXwovVnmmUwU4qM_Wbq1Wr62edidynXrmFai1MB8cXQb5_fjlRr_S8mOse-omcgw-3y4w1wxJ9qF2Vtg8RtFJk4_-6QV81Uym1_Mu1flhx9dddoknvVuI97oUserv1sm4U38w-n8V8rZbXqMImxcU73oJqb5tQIl5048QaIyX3dc_zZFhQO_IF8k7yjmqQhZlQzo97Jqr605y2sQYbydyajnXecbZBooY-Jf27txU863r4a5rFilqo_ogWmI5wbquJ76O4os_zf0am44Bn_XWgMwkxlgWbYb8yfWwao7j45bhy0Iu3hB3VpmO3Iv2l5n6aYjsyQd4ol1IzZSdyky3YlJVkpix9ha4-Fu8JmRvOiSdJiicxahkc8_zv51lnmj-ZYyksMWu8Ia-76ZjS694oIi37ZZu9bsJOe8tohp4h7RmI9kj9um7";

    }
}

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
        return "ya29.c.c0AY_VpZh3Gj3PX2HyxGlLQAWRhThmsmg6NtDP8I6BN8W3npT1E4vDUGanaEK_n9CoqpIyqLgcik3asm7q_sGBozW319VOfaeLlu-8DQ-2UtsvAOwI2QUL9ReUQD5aEIbX8gZK7mPgy2JVEUqRMkLMO8Asw9is2PYlbNzJVZHlk-J_mVQrTiiY1Tl-tnF971yek6p8feWuXNQRMhmVwoD2xmNdzXo73--zr7oYGWYiqldtr__9fpMGzwkDekqhXUAs1iNoJScMycTY56EETLzfKKeocfNsCPZCapUtp8kOoYi2i5F6eYbhp2n5Feo6EHPLADBjHqxTqHtMmN2EZRISU1rECliCjiV8LEZ0RY-zT4eGQCQccrDU9MkN384Aca-FBl_QIjndearaU0UyosrROqlhJyp5hfhudlp1tmSgVybYcRXSsBntVkcakjnWhIyl_oYtxf246ua8roSgeFt6Bk_-gZcrc54hRnWnFZZvihQiWS-hwfvp87QB95XpaJpkj6-r3m6Rb27UtJ6uWm_jur0_zigb2rJlsycvOWtuxYqoV9jlguvjuF3YbkJUVJ8jz_S6t6_ppz3FpV65gQMplzt8biUmYj5RkQ4vV-Qittoqa7ZUvujOyBBw6irZQd5itZzi1i2921IoeJbOmtsqs0J4jUkfV4pxzJr-lWW28dtUtep5ftSpRtf_5Xi3OyIItRsybMevb8r-pf_Z0mOZOJdc-g-jcF14-iq4quk3Wz1ma5byiR5B0yJsX3BzwzOhidoMwaXy_jBcWp8nYo6JrSfuX1VIVSSf_Io9cmOV_JwhUhR-z2ss921fpz5vUwogiR07v1Q_RMRsiBgmg2UirgFBi9BeRcd155-9fckJYwMwek4ucqq3MOb6sezcZ0vqagbXO4w5ces8MnYqy9v2duv687RmewqZ82focVZvWgd6BYpSg-ol3F_a9sowzv-cmqYFp4yWgWtX3Sld6zlQZ9-x3gjmdupiYyiiywfeQFr-5kVam9FSYwW";

    }
}

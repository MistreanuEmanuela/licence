package com.example.PetPulse.controllers;
import com.example.PetPulse.Advice.EmailTokenProvider;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.models.entities.UserCredentials;
import com.example.PetPulse.services.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import javax.lang.model.util.SimpleElementVisitor7;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/users")
public class UserController {
    private final UserServiceImp userService;

    @Autowired
    public UserController(UserServiceImp userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/create", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody @Valid User user) {
        userService.createUser(user);
    }

    @PostMapping(value = "/connect", produces = "application/json")
    public void login(@RequestBody UserCredentials credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
        userService.login(username, password);
    }

    @GetMapping(value = "/confirm", produces = "application/json")
    public void confirmUserAccount(@RequestParam("token") String token) {
        System.out.print("here");
        userService.confirmUserAccount(token);
    }

    @PostMapping(value = "/forgotPassword", produces = "application/json")
    public void forgotPassword(@RequestBody String email) {
        System.out.print(email);
        userService.forgotPassword(email);
    }

    @PostMapping(value = "/codeForgotPassword", produces = "application/json")
    public void forgotPassword(@RequestBody Map<String, String> requestBody) {
        System.out.print(requestBody);
        String code = requestBody.get("code");
        String email = requestBody.get("email");
        userService.validatePasswordCode(code, email);
    }

    @PostMapping(value = "/changePassword", produces = "application/json")
    public void changePassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String newPassword = requestBody.get("newPassword");
        System.out.print(email);
        System.out.print(newPassword);
        userService.changePassword(email, newPassword);
    }
}


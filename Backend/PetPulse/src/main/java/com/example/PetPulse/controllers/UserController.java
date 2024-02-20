package com.example.PetPulse.controllers;
import com.example.PetPulse.Advice.EmailTokenProvider;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.models.entities.UserCredentials;
import com.example.PetPulse.services.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
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

    @GetMapping("/users/confirm")
    public void confirmUserAccount(@RequestParam("token") String token) {
        userService.confirmUserAccount(token);
    }
}


package com.example.PetPulse.controllers;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.models.dto.UserDto;
import com.example.PetPulse.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping(value = "/create", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody @Valid User user)  {
        userService.createUser(user);
    }

    @GetMapping("/hello")
    public String hello() {
        return "here";
    }
}

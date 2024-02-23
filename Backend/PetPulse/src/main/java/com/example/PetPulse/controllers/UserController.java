package com.example.PetPulse.controllers;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.services.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.PetPulse.models.dto.UsersDto.*;

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
    public void login(@RequestBody LoginUserDTO loginUserDTO) {
        String username =loginUserDTO.getUsername();
        String password = loginUserDTO.getPassword();
        userService.login(username, password);
    }

    @GetMapping(value = "/confirm", produces = "application/json")
    public void confirmUserAccount(@RequestParam("token") String token) {
        userService.confirmUserAccount(token);
    }

    @PostMapping(value = "/forgotPassword", produces = "application/json")
    public void forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        String email = forgotPasswordDTO.getEmail();
        userService.forgotPassword(email);
    }

    @PostMapping(value = "/codeForgotPassword", produces = "application/json")
    public void forgotPasswordCode(@RequestBody ValidateCodeChangePasswordDTO validateCodeChangePasswordDTO) {
        String code = validateCodeChangePasswordDTO.getCode();
        String email = validateCodeChangePasswordDTO.getEmail();
        userService.validatePasswordCode(code, email);
    }

    @PostMapping(value = "/changePassword", produces = "application/json")
    public void changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        String email = changePasswordDTO.getEmail();
        String newPassword = changePasswordDTO.getNewPassword();
        userService.changePassword(email, newPassword);
    }
}


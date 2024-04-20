package com.example.PetPulse.controllers;
import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.services.UserServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.PetPulse.models.dto.UsersDto.*;

import java.util.List;
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
    public void createUser(@RequestBody @Valid UserDto user) {
        userService.createUser(user);
    }

    @Operation(security = {})
    @PostMapping(value = "/connect", produces = "application/json")
    public String login(@RequestBody LoginUserDTO loginUserDTO) {
        String username =loginUserDTO.getUsername();
        String password = loginUserDTO.getPassword();
        return userService.login(username, password);
    }

    @GetMapping(value = "/confirm", produces = "application/json")
    public void confirmUserAccount(@RequestParam("token") String token) {
        userService.confirmUserAccount(token);
    }

    @PostMapping(value = "/forgotPassword", produces = "application/json")
    public void forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        String email = forgotPasswordDTO.getEmail();
        System.out.println(email);
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
    @GetMapping(path = "/profile")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ProfileUserDTO getProfile(Authentication authentication)
    {
        String username = authentication.getName();
        return userService.findUserProfile(username);
    }

}


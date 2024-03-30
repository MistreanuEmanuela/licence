package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.UsersDto.UserDto;
import com.example.PetPulse.models.entities.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface UserService {
    User createUser(UserDto user);
    boolean isValidPassword(String password);
    public String encodePassword(String rawPassword);
    public boolean matchesPassword(String rawPassword, String encodedPassword);
    public String login(String username, String password);

    public void sendConfirmationEmail(User user);

    public boolean confirmUserAccount(String token);

    public void validatePasswordCode(String code, String email);
    public void changePassword(String email, String newPassword);
    public void forgotPassword(String email);
    public void sendPasswordResetEmail(String email, String token) ;

    }
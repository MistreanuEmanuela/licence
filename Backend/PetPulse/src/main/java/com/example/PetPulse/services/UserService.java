package com.example.PetPulse.services;

import com.example.PetPulse.models.entities.User;

public interface UserService {
    User createUser(User user);
    boolean isValidPassword(String password);
    public String encodePassword(String rawPassword);
    public boolean matchesPassword(String rawPassword, String encodedPassword);
    public boolean login(String username, String password);

    public void sendConfirmationEmail(User user);

    public boolean confirmUserAccount(String token);

}
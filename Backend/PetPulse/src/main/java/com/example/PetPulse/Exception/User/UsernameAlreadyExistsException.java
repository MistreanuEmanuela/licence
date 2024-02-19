package com.example.PetPulse.Exception.User;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
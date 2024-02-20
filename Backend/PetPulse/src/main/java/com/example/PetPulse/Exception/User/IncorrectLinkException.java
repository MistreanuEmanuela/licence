package com.example.PetPulse.Exception.User;

public class IncorrectLinkException extends RuntimeException{
    public IncorrectLinkException(String message) {
        super(message);
    }
}
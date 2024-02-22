package com.example.PetPulse.Exception.User;

public class IncorrectCodeException extends RuntimeException{
    public IncorrectCodeException(String message) {
        super(message);
    }
}
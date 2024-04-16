package com.example.PetPulse.Exception.Pet;

public class PetNotFoundException extends RuntimeException{
    public  PetNotFoundException(String message) {
        super(message);
    }
}

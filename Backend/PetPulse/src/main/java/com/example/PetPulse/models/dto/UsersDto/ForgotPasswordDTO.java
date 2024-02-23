package com.example.PetPulse.models.dto.UsersDto;

import jakarta.validation.constraints.NotBlank;

public class ForgotPasswordDTO {
    @NotBlank
    private String email;

    public ForgotPasswordDTO(String email) {
        this.email = email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
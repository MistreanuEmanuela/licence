package com.example.PetPulse.models.dto.UsersDto;

import jakarta.validation.constraints.NotBlank;

public class ValidateCodeChangePasswordDTO {

    @NotBlank
    private String email;

    @NotBlank
    private String code;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public String getCode() {
        return code;
    }
}

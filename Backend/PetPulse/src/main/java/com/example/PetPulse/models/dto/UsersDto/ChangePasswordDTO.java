package com.example.PetPulse.models.dto.UsersDto;

import jakarta.validation.constraints.NotBlank;

public class ChangePasswordDTO {
    @NotBlank
    private String email;

    @NotBlank
    private String newPassword;

    public ChangePasswordDTO() {
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public ChangePasswordDTO(String email, String newPassword) {
        this.email = email;
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }

    public String getNewPassword() {
        return newPassword;
    }
}

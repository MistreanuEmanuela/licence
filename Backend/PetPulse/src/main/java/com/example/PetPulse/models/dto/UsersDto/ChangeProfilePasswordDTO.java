package com.example.PetPulse.models.dto.UsersDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeProfilePasswordDTO {
    private String currentPassword;
    private String newPassword;
}

package com.example.PetPulse.models.dto.UsersDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEditDTO {
    private String lastName;
    private String firstName;
    private Date birthdate;
}

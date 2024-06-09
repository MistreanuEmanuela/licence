package com.example.PetPulse.models.dto.UsersDto;
import com.example.PetPulse.models.entities.Role;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String lastName;
    private String password;
    private String firstName;
    private String email;
    private Date birthdate;
    private String username;
    @Getter @Setter
    private Role role;

}

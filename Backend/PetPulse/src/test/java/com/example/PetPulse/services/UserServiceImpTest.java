package com.example.PetPulse.services;

import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.Exception.User.EmailAlreadyExistsException;
import com.example.PetPulse.models.dto.UsersDto.ChangeProfilePasswordDTO;
import com.example.PetPulse.models.dto.UsersDto.ProfileUserDTO;
import com.example.PetPulse.models.dto.UsersDto.UserDto;
import com.example.PetPulse.models.dto.UsersDto.UserEditDTO;
import com.example.PetPulse.models.entities.Role;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.RoleRepository;
import com.example.PetPulse.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImpTest {
    @Mock
    UserRepository userRepository;
    @Mock
    RoleRepository roleRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;
    @Mock
    private JavaMailSender mailSender;
    @InjectMocks
    UserServiceImp userServiceImp;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser() {
        UserDto userDto = new UserDto("test", "Test@2024","test", "mistreanu.emanuela@gmail.com", new Date(-100000), "test", null);
        when(userRepository.findByEmail("mistreanu.emanuela@gmail.com")).thenReturn(null);
        when(userRepository.findByUsername("test")).thenReturn(null);
        Role role = new Role(1L, "user");
        when(roleRepository.findByName("user")).thenReturn(role);
        assertDoesNotThrow(() -> userServiceImp.createUser(userDto));
        verify(userRepository, times(1)).save(any());
    }

    @Test
    void createUserEmailExist() {
        User user =  new User(1L, "test", "test", "test");
        UserDto userDto = new UserDto("test", "Test@2024","test", "mistreanu.emanuela@gmail.com", new Date(-100000), "test", null);
        when(userRepository.findByEmail("mistreanu.emanuela@gmail.com")).thenReturn(user);
        EmailAlreadyExistsException exception = assertThrows(EmailAlreadyExistsException.class ,() -> userServiceImp.createUser(userDto));
        assertEquals("Email already exists", exception.getMessage());

    }


    @Test
    void findUserProfile() {
        User user =  new User(1L, "test", "test", "test");
        when(userRepository.findByUsername("test")).thenReturn(user);
        ProfileUserDTO profileUserDTO = userServiceImp.findUserProfile("test");
        assertNotNull(profileUserDTO);
        assertEquals("test", profileUserDTO.getFirstName());

    }

    @Test
    void changeProfilePassword() {
        User user =  new User(1L, "test", "test", "test");
        when(userRepository.findByUsername("test")).thenReturn(user);
        when(userServiceImp.matchesPassword("test", null)).thenReturn(true);
        ChangeProfilePasswordDTO changeProfilePasswordDTO = new ChangeProfilePasswordDTO("test", "Test@2002");
        assertDoesNotThrow(() -> {
            userServiceImp.changeProfilePassword(changeProfilePasswordDTO, "test");
        });
        verify(userRepository, times(1)).save(any());
    }

    @Test
    void changeProfileInformation() {
        User user =  new User(1L, "test", "test", "test");
        when(userRepository.findByUsername("test")).thenReturn(user);
        UserEditDTO userEditDTO = new UserEditDTO("test", "test", new Date(-2000));
        assertDoesNotThrow(() -> {
            userServiceImp.changeProfileInformation(userEditDTO, "test");
        });
        verify(userRepository, times(1)).save(any());
    }

    @Test
    void changeProfileInformationThrowsInvalidBirthdate() {
        User user =  new User(1L, "test", "test", "test");
        when(userRepository.findByUsername("test")).thenReturn(user);
        UserEditDTO userEditDTO = new UserEditDTO("test", "test", new Date());
        GeneralException exception =  assertThrows(GeneralException.class, () -> {
            userServiceImp.changeProfileInformation(userEditDTO, "test");
        });
        assertEquals("Invalid birthdate", exception.getMessage());
    }

    @Test
    void changeProfileInformationThrowsInvalidName() {
        User user =  new User(1L, "test", "test", "test");
        when(userRepository.findByUsername("test")).thenReturn(user);
        UserEditDTO userEditDTO = new UserEditDTO("test234567543 ,cs", "test", new Date(-12345676));
        GeneralException exception =  assertThrows(GeneralException.class, () -> {
            userServiceImp.changeProfileInformation(userEditDTO, "test");
        });
        assertEquals("Invalid name", exception.getMessage());
    }


}
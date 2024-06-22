package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.UsersDto.*;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.services.UserServiceImp;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
class UserControllerTest {
    @Mock
    private UserServiceImp userServiceImp;
    private User testUser;
    @Mock
    private Authentication authentication;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createUser() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Date date = new Date(118, 1, 1);
        UserDto user = new UserDto("test", "test", "test", "test@gmail.com", date, "test", null);
        userController.createUser(user);
        verify(userServiceImp).createUser(user);
    }

    @Test
    void login() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        LoginUserDTO loginUserDTO = new LoginUserDTO("testuser", "testpassword");
        String expectedToken = "example_token";

        when(userServiceImp.login(loginUserDTO.getUsername(), loginUserDTO.getPassword())).thenReturn(expectedToken);
        String result = userController.login(loginUserDTO);
        assertEquals(expectedToken, result, "The method return the expected token.");
        verify(userServiceImp, times(1)).login(loginUserDTO.getUsername(), loginUserDTO.getPassword());
    }


    @Test
    void getProfile() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getName()).thenReturn("test");
        Date date = new Date(118, 1, 1);
        ProfileUserDTO expectedProfile = new ProfileUserDTO("test", "test", "test@gmail.com", date, "test");

        when(userServiceImp.findUserProfile("test")).thenReturn(expectedProfile);
        ProfileUserDTO result = userController.getProfile(authentication);

        assertEquals(expectedProfile, result, "The method shoud return the expected profile.");
        verify(userServiceImp, times(1)).findUserProfile("test");
    }

    @Test
    void changePasswordProfile() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getName()).thenReturn("test");

        ChangeProfilePasswordDTO changeProfilePasswordDTO = new ChangeProfilePasswordDTO("oldPassword", "newPassword");
        when(userServiceImp.changeProfilePassword(changeProfilePasswordDTO, "test")).thenReturn(true);

        ResponseEntity<String> response = userController.changePasswordProfile(changeProfilePasswordDTO, authentication);

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Response status 200");
        assertEquals("Password changed successfully", response.getBody(), "The message should be the successfully message from methods");
        verify(userServiceImp, times(1)).changeProfilePassword(changeProfilePasswordDTO, "test");
    }
    @Test
    void changePasswordProfileWrong() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getName()).thenReturn("test");

        ChangeProfilePasswordDTO changeProfilePasswordDTO = new ChangeProfilePasswordDTO("oldPassword", "newPassword");
        when(userServiceImp.changeProfilePassword(changeProfilePasswordDTO, "test")).thenReturn(false);

        ResponseEntity<String> response = userController.changePasswordProfile(changeProfilePasswordDTO, authentication);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode(), "Response status 400");
        assertEquals("Incorrect password or an error occurs!", response.getBody(), "The message should be the error message from methods");
        verify(userServiceImp, times(1)).changeProfilePassword(changeProfilePasswordDTO, "test");
    }

    @Test
    void changeInfoProfile() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getName()).thenReturn("test");
        Date date = new Date(118, 1, 1);
        UserEditDTO userEditDTO= new UserEditDTO("test", "test", date );
        when(userServiceImp.changeProfileInformation(userEditDTO, "test")).thenReturn(true);

        ResponseEntity<String> response = userController.changeInfoProfile(userEditDTO, authentication);

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Response status 200");
        assertEquals("Information updated successfully", response.getBody(), "The message should be the successfully message from methods");
        verify(userServiceImp, times(1)).changeProfileInformation(userEditDTO, "test");
    }

    @Test
    void changeInfoProfileWrong() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getName()).thenReturn("test");
        Date date = new Date(118, 1, 1);
        UserEditDTO userEditDTO= new UserEditDTO("test", "test", date );
        when(userServiceImp.changeProfileInformation(userEditDTO, "test")).thenReturn(false);

        ResponseEntity<String> response = userController.changeInfoProfile(userEditDTO, authentication);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode(), "Response status 404");
        assertEquals("Some errors occurs", response.getBody(), "The message should be the error message from methods");
        verify(userServiceImp, times(1)).changeProfileInformation(userEditDTO, "test");
    }
}
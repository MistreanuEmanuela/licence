package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;
import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.services.DogInfoServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class QuickInfoDogControllerTest {
    @Mock
    private DogInfoServiceImp dogServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private QuickDogInfoController quickDogInfoController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);

    }
    @Test
    public void testGetInformation() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        String username = "user1";
        when(authentication.getName()).thenReturn(username);

        Long id = 1L;
        QuickInfoDogDTO quickInfoDogDTO = new QuickInfoDogDTO();
        when(dogServiceImp.getDogInfo(id)).thenReturn(Optional.of(quickInfoDogDTO));

        ResponseEntity<QuickInfoDogDTO> response = quickDogInfoController.getDogInfo(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(quickInfoDogDTO, response.getBody());
        verify(dogServiceImp).getDogInfo(id);
    }
}

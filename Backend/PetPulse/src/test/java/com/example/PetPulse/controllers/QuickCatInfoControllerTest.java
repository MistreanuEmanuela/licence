package com.example.PetPulse.controllers;

import com.example.PetPulse.controllers.QuickCatInfoController;
import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;
import com.example.PetPulse.services.CatInfoServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class QuickCatInfoControllerTest {

    @Mock
    private CatInfoServiceImp catServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private QuickCatInfoController quickCatInfoController;

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
        QuickInfoCatDTO quickInfoCatDTO = new QuickInfoCatDTO();
        when(catServiceImp.getCatInfo(id)).thenReturn(quickInfoCatDTO);

        QuickInfoCatDTO responseEntity = quickCatInfoController.getCatInfo(id);

        assertEquals(responseEntity, quickInfoCatDTO);
        verify(catServiceImp).getCatInfo(id);
    }
}


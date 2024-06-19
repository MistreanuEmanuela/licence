package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingsCompleteDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.DogFormDTO;
import com.example.PetPulse.models.dto.FormsBestFit.FormCat;
import com.example.PetPulse.services.CatRatingServiceImp;
import com.example.PetPulse.services.DogRatingServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class StarRatingDogControllerTest {
    @Mock
    private DogRatingServiceImp dogRatingServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private StarRatingDogController starRatingDogController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);

    }

    @Test
    void getDogStar() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        String username = "user1";
        when(authentication.getName()).thenReturn(username);

        Long id = 1L;
        DogRatingDTO dogRatingDTO = new DogRatingDTO();
        when(dogRatingServiceImp.getDogRating(id)).thenReturn(dogRatingDTO);

        DogRatingDTO responseEntity = starRatingDogController.getDogStar(id);

        assertEquals(responseEntity,dogRatingDTO);
        verify(dogRatingServiceImp).getDogRating(id);
    }

    @Test
    void getBest() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        String username = "user1";
        when(authentication.getName()).thenReturn(username);
        DogFormDTO form = new DogFormDTO(true, true, true, true, true, true, true, true, true, true, true);
        Long id = 1L;
        DogRatingsCompleteDTO dogRatingDTO = new DogRatingsCompleteDTO();
        when(dogRatingServiceImp.getBestFit(form)).thenReturn(dogRatingDTO);

        DogRatingsCompleteDTO responseEntity = starRatingDogController.getBest(form);

        assertEquals(responseEntity, dogRatingDTO);
        verify(dogRatingServiceImp).getBestFit(form);
    }
}
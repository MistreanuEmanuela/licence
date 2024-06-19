package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.FormCat;
import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;
import com.example.PetPulse.models.entities.CatRating;
import com.example.PetPulse.services.CatRatingServiceImp;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class StarRatingCatControllerTest {
    @Mock
    private CatRatingServiceImp catRatingServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private StarRatingCatController starRatingCatController;

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
        CatRatingDTO catRatingDTO = new CatRatingDTO();
        when(catRatingServiceImp.getCatRating(id)).thenReturn(catRatingDTO);

        CatRatingDTO responseEntity = starRatingCatController.getDogStar(id);

        assertEquals(responseEntity, catRatingDTO);
        verify(catRatingServiceImp).getCatRating(id);
    }

    @Test
    void getBest() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        String username = "user1";
        when(authentication.getName()).thenReturn(username);
        FormCat form = new FormCat(true,true,true,true,true,5,5,true,5);
        Long id = 1L;
        CatRatingsCompleteDTO catRatingDTO = new CatRatingsCompleteDTO();
        when(catRatingServiceImp.getBestFit(form)).thenReturn(catRatingDTO);

        CatRatingsCompleteDTO responseEntity = starRatingCatController.getBest(form);

        assertEquals(responseEntity, catRatingDTO);
        verify(catRatingServiceImp).getBestFit(form);
    }
}
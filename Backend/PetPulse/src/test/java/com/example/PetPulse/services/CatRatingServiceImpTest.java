package com.example.PetPulse.services;
import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.FormCat;
import com.example.PetPulse.models.entities.Cat;
import com.example.PetPulse.models.entities.CatRating;
import com.example.PetPulse.repositories.CatRatingRepository;
import com.example.PetPulse.repositories.CatRepository;
import com.example.PetPulse.repositories.QuickInfoCatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;


class CatRatingServiceImpTest {

    @Mock
    private CatRatingRepository catRatingRepository;
    @Mock
    private CatRepository catRepository;

    @InjectMocks
    private CatRatingServiceImp catRatingServiceImp;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getCatRating() {
        CatRating cat = new CatRating(1,1, 5,5,5,5,5,5,5,5,5,5);
        when(catRatingRepository.findInfoById((long) 1)).thenReturn((cat));
        CatRatingDTO returnCat = catRatingServiceImp.getCatRating(1L);
        assertNotNull(returnCat);
        assertEquals(1, returnCat.getId());
        assertEquals(5, returnCat.getStrangers());
        assertEquals(5, returnCat.getIntelligence());
        assertEquals(5, returnCat.getGroom());
        assertEquals(5, returnCat.getPlayfulness());
        assertEquals(5, returnCat.getKidFriendly());
        verify(catRatingRepository, times(1)).findInfoById((long) 1);
        verifyNoMoreInteractions(catRatingRepository);
    }

    @Test
    void getBestFit() {
        List<CatRating> catRatings = new ArrayList<>();
        CatRating catRating1 = new CatRating(1, 1, 3, 4, 2, 1, 5, 4, 3, 4, 5, 5);
        CatRating catRating2 = new CatRating(2, 2, 5, 4, 5, 3, 2, 4, 3, 4, 2, 2);
        catRatings.add(catRating1);
        catRatings.add(catRating2);

        FormCat form = new FormCat(true, true, true, true, true, 5, 5, true, 5);


        when(catRatingRepository.findAll()).thenReturn(catRatings);
        when(catRepository.findById((long) catRating1.getIdCat())).thenReturn(new Cat(1L, "Cat1", "general", "size", "personality", "health", "coat", "friendship", "care"));

        when(catRepository.findById((long) catRating2.getIdCat())).thenReturn(new Cat(2L, "Cat2", "general", "size", "personality", "health", "coat", "friendship", "care"));

        CatRatingsCompleteDTO result = catRatingServiceImp.getBestFit(form);

        assertNotNull(result);
        assertEquals(catRating1.getId(), result.getId());
        assertEquals(1, result.getIdCat());
        assertEquals(catRating1.getIdCat(), result.getIdCat());

    }
}
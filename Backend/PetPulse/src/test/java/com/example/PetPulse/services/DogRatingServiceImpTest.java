package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.DogFormDTO;
import com.example.PetPulse.models.entities.Dog;
import com.example.PetPulse.models.entities.DogRating;
import com.example.PetPulse.repositories.DogRatingRepository;
import com.example.PetPulse.repositories.DogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class DogRatingServiceImpTest {
    @Mock
    private DogRatingRepository dogRatingRepository;

    @Mock
    private DogRepository dogRepository;

    @InjectMocks
    private DogRatingServiceImp dogRatingServiceImp;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void getDogRating() {
        DogRating dogRating = new DogRating(1, 1, 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5 );
        when(dogRatingRepository.findInfoById((long)1)).thenReturn(dogRating);
        DogRatingDTO dogRatingDTO = dogRatingServiceImp.getDogRating(1L);
        assertNotNull(dogRatingDTO);
        assertEquals(dogRating.getIdDog(), dogRatingDTO.getIdDog());
        assertEquals(dogRating.getSize(), dogRatingDTO.getSize());
    }

    @Test
    void getBestFit() {
        List<DogRating> dogRatingList = new ArrayList<>();
        DogRating dog1 = new DogRating(1, 1, 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5 );
        DogRating dog2 = new DogRating(2, 2, 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5 );
        dogRatingList.add(dog1);
        dogRatingList.add(dog2);
        DogFormDTO form = new DogFormDTO(true, true, true, true, true, true, true, true, true, true, true);
        when(dogRatingRepository.findAll()).thenReturn(dogRatingList);
        when(dogRepository.findById(1L)).thenReturn(new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " "));
        when(dogRepository.findById(2L)).thenReturn(new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " "));

        DogRatingsCompleteDTO dogRatingsCompleteDTO = dogRatingServiceImp.getBestFit(form);
        assertNotNull(dogRatingsCompleteDTO);
        assertEquals("test2", dogRatingsCompleteDTO.getName());
    }
}
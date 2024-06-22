package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.models.entities.QuickInfoDog;
import com.example.PetPulse.repositories.QuickInfoDogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class DogInfoServiceImpTest {
    @Mock
    private QuickInfoDogRepository mockRepository;

    @InjectMocks
    private DogInfoServiceImp dogInfoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getDogInfo() {
        QuickInfoDog info = new QuickInfoDog(1, "origin", "size", "breedGroup", "12-13years", "brown", " ", " ", " ", " ", 1);
        when(mockRepository.findInfoById((long) 1)).thenReturn(Optional.of((info)));
        Optional<QuickInfoDogDTO> result = dogInfoService.getDogInfo((long)1);
        assertNotNull(result);
        assertEquals(Optional.of(1), Optional.ofNullable(result.get().getIdDog()));
    }
}
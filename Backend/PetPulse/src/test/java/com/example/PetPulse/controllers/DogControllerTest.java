package com.example.PetPulse.controllers;
import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.dto.DogDTO.SearchResultDogDTO;
import com.example.PetPulse.models.entities.Dog;
import com.example.PetPulse.services.DogServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DogControllerTest {

    @Mock
    private DogServiceImp dogService;

    @InjectMocks
    private DogController dogController;

    private Dog testDog;
    private byte[] testImage;
    private List<DogAllDTO> testDogList;
    private List<SearchResultDogDTO> testSearchResultList;

    @BeforeEach
    public void setUp() {
        testDog = new Dog();
        testDog.setId(1L);
        testDog.setName("Buddy");

        testImage = new byte[]{0, 1, 2, 3};

        DogAllDTO dogAllDTO = new DogAllDTO();
        dogAllDTO.setName("Buddy");
        testDogList = Collections.singletonList(dogAllDTO);

        SearchResultDogDTO searchResultDogDTO = new SearchResultDogDTO();
        searchResultDogDTO.setName("Buddy");
        testSearchResultList = Collections.singletonList(searchResultDogDTO);
    }

    @Test
    public void testGetDog() {
        when(dogService.getDog(anyLong())).thenReturn(testDog);

        Dog result = dogController.getDog(1L);

        assertEquals(testDog, result);
        verify(dogService).getDog(1L);
    }

    @Test
    public void testGetDogPicture() {
        when(dogService.getDogPicture(anyString())).thenReturn(testImage);

        ResponseEntity<byte[]> response = dogController.getDogPicture("Buddy");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testImage, response.getBody());
        verify(dogService).getDogPicture("Buddy");
    }

    @Test
    public void testGetAllDogs() {
        when(dogService.getAllDogs()).thenReturn(testDogList);

        List<DogAllDTO> result = dogController.getAllDogs();

        assertEquals(testDogList, result);
        verify(dogService).getAllDogs();
    }

    @Test
    public void testGetAllDogsBySize() {
        when(dogService.getAllDogsBySize(anyString())).thenReturn(testDogList);

        List<DogAllDTO> result = dogController.getAllDogsBySize("small");

        assertEquals(testDogList, result);
        verify(dogService).getAllDogsBySize("small");
    }

    @Test
    public void testGetAllDogsByLifespan() {
        when(dogService.getAllDogsByLifespan(anyString())).thenReturn(testDogList);

        List<DogAllDTO> result = dogController.getAllDogsByLifespan("10");

        assertEquals(testDogList, result);
        verify(dogService).getAllDogsByLifespan("10");
    }

    @Test
    public void testGetAllDogsByCoat() {
        when(dogService.getAllDogsByCoat(anyString())).thenReturn(testDogList);

        List<DogAllDTO> result = dogController.getAllDogsByCoat("short");

        assertEquals(testDogList, result);
        verify(dogService).getAllDogsByCoat("short");
    }

    @Test
    public void testGetAllDogsByColor() {
        when(dogService.getAllDogsByColor(anyString())).thenReturn(testDogList);

        List<DogAllDTO> result = dogController.getAllDogsByCoatColor("black");

        assertEquals(testDogList, result);
        verify(dogService).getAllDogsByColor("black");
    }

    @Test
    public void testGetAllDogsByFirstLetter() {
        when(dogService.getAllDogsByFirstLetter(anyString())).thenReturn(testDogList);

        List<DogAllDTO> result = dogController.getAllDogsByStartName("B");

        assertEquals(testDogList, result);
        verify(dogService).getAllDogsByFirstLetter("B");
    }

    @Test
    public void testGetAllDogsSearched() {
        when(dogService.getDogsSearched(anyString())).thenReturn(testSearchResultList);

        ResponseEntity<List<SearchResultDogDTO>> response = dogController.getAllDogsSearched("Buddy");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testSearchResultList, response.getBody());
        verify(dogService).getDogsSearched("Buddy");
    }

    @Test
    public void testGetAllDogsSearchedNotFound() {
        when(dogService.getDogsSearched(anyString())).thenReturn(Collections.emptyList());

        ResponseEntity<List<SearchResultDogDTO>> response = dogController.getAllDogsSearched("Unknown");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(dogService).getDogsSearched("Unknown");
    }
}

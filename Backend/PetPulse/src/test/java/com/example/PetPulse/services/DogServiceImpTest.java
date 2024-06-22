package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.dto.DogDTO.SearchResultDogDTO;
import com.example.PetPulse.models.entities.Dog;
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

class DogServiceImpTest {
    @Mock
    private DogRepository dogRepository;

    @InjectMocks
    private DogServiceImp dogServiceImp;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getDog() {
        Dog dog = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        when(dogRepository.findById((long)1)).thenReturn(dog);
        Dog resultDog = dogServiceImp.getDog((long)1);
        assertNotNull(resultDog);
        assertEquals("test", resultDog.getName());
    }

    @Test
    void getAllDogs() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findAllDogs()).thenReturn(dogs);
        List<DogAllDTO> result = dogServiceImp.getAllDogs();
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }

    @Test
    void getAllDogsBySize() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findAllDogsBySize("small")).thenReturn(dogs);
        List<DogAllDTO> result = dogServiceImp.getAllDogsBySize("small");
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }

    @Test
    void getAllDogsByLifespan() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findAllDogsByLifespan("-15")).thenReturn(dogs);
        List<DogAllDTO> result = dogServiceImp.getAllDogsByLifespan("15");
        System.out.println(result);
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }

    @Test
    void getAllDogsByCoat() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findAllDogsByCoatType("curly")).thenReturn(dogs);
        List<DogAllDTO> result = dogServiceImp.getAllDogsByCoat("curly");
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }

    @Test
    void getAllDogsByColor() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findDogsByCoatColor("brown")).thenReturn(dogs);
        List<DogAllDTO> result = dogServiceImp.getAllDogsByColor("brown");
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }

    @Test
    void getAllDogsByFirstLetter() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findDogsByNameStartingWithLetter("t")).thenReturn(dogs);
        List<DogAllDTO> result = dogServiceImp.getAllDogsByFirstLetter("t");
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }

    @Test
    void getDogsSearched() {
        List<Dog> dogs = new ArrayList<>();
        Dog dog1 = new Dog("test", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        Dog dog2 = new Dog("test2", "general", "size", " ", " ", " ", " ", " ", " ", " ");
        dogs.add(dog1);
        dogs.add(dog2);
        when(dogRepository.findByName("test")).thenReturn(dogs);
        List<SearchResultDogDTO> result = dogServiceImp.getDogsSearched("test");
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test", result.get(0).getName());
    }
}
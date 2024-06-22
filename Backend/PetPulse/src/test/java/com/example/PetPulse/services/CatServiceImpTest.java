package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.CatDTO.CatAllDTO;
import com.example.PetPulse.models.dto.CatDTO.SearchResultCatDTO;
import com.example.PetPulse.models.entities.Cat;
import com.example.PetPulse.repositories.CatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

class CatServiceImpTest {
    @Mock
    private CatRepository catRepository;
    @InjectMocks
    private CatServiceImp catServiceImp;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void getCat() {
        Cat cat = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        when(catRepository.findById((long) 1)).thenReturn((cat));
        Cat result = catServiceImp.getCat(1L);
        assertNotNull(result);
        assertEquals("test", result.getName());
    }

    @Test
    void getAllCats() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findAllCats()).thenReturn(cats);
        List<CatAllDTO> resultCats = catServiceImp.getAllCats();
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }

    @Test
    void getAllCatsBySize() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findAllCatsBySize("small")).thenReturn(cats);
        List<CatAllDTO> resultCats = catServiceImp.getAllCatsBySize("small");
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }

    @Test
    void getAllCatsByLifespan() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findAllCatsByLifespan("15")).thenReturn(cats);
        List<CatAllDTO> resultCats = catServiceImp.getAllCatsByLifespan("15");
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }

    @Test
    void getAllCatsByCoat() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findAllCatsByCoatType("curly")).thenReturn(cats);
        List<CatAllDTO> resultCats = catServiceImp.getAllCatsByCoat("curly");
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }

    @Test
    void getAllCatsByColor() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findCatsByCoatColor("brown")).thenReturn(cats);
        List<CatAllDTO> resultCats = catServiceImp.getAllCatsByColor("brown");
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }

    @Test
    void getAllCatsByFirstLetter() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findCatsByNameStartingWithLetter("a")).thenReturn(cats);
        List<CatAllDTO> resultCats = catServiceImp.getAllCatsByFirstLetter("a");
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }

    @Test
    void getSearchCats() {
        List<Cat> cats = new ArrayList<>();
        Cat cat1 = new Cat(1L, "test", "general", "size", "personality", "health", "coat", "friendship", "care");
        Cat cat2 = new Cat(2L, "test2", "general", "size", "personality", "health", "coat", "friendship", "care");
        cats.add(cat1);
        cats.add(cat2);
        when(catRepository.findByName("test")).thenReturn(cats);
        List<SearchResultCatDTO> resultCats = catServiceImp.getSearchCats("test");
        assertNotNull(resultCats);
        assertEquals(2, resultCats.size());
        assertEquals("test", resultCats.get(0).getName());
    }
}
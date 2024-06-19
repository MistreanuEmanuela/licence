package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.CatDTO.CatAllDTO;
import com.example.PetPulse.models.dto.CatDTO.SearchResultCatDTO;
import com.example.PetPulse.models.entities.Cat;
import com.example.PetPulse.services.CatServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CatControllerTest {

    @Mock
    private CatServiceImp catService;

    @InjectMocks
    private CatController catController;

    private Cat testCat;
    private byte[] testImage;
    private List<CatAllDTO> testCatList;
    private List<SearchResultCatDTO> testSearchResultList;

    @BeforeEach
    public void setUp() {
        testCat = new Cat();
        testCat.setId(1L);
        testCat.setName("Whiskers");

        testImage = new byte[]{0, 1, 2, 3};

        CatAllDTO catAllDTO = new CatAllDTO();
        catAllDTO.setName("Whiskers");
        testCatList = Collections.singletonList(catAllDTO);

        SearchResultCatDTO searchResultCatDTO = new SearchResultCatDTO();
        searchResultCatDTO.setName("Whiskers");
        testSearchResultList = Collections.singletonList(searchResultCatDTO);
    }

    @Test
    public void testGetCat() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getCat(anyLong())).thenReturn(testCat);

        Cat result = catController.getCat(1L);

        assertEquals(testCat, result);
        verify(catService).getCat(1L);
    }

    @Test
    public void testGetCatPicture() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getCatPicture(anyString())).thenReturn(testImage);

        ResponseEntity<byte[]> response = catController.getCatPicture("Whiskers");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testImage, response.getBody());
        verify(catService).getCatPicture("Whiskers");
    }

    @Test
    public void testGetAllCats() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getAllCats()).thenReturn(testCatList);

        List<CatAllDTO> result = catController.getAllCats();

        assertEquals(testCatList, result);
        verify(catService).getAllCats();
    }

    @Test
    public void testGetAllCatsBySize() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getAllCatsBySize(anyString())).thenReturn(testCatList);

        List<CatAllDTO> result = catController.getAllCatsBySize("small");

        assertEquals(testCatList, result);
        verify(catService).getAllCatsBySize("small");
    }

    @Test
    public void testGetAllCatsByLifespan() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getAllCatsByLifespan(anyString())).thenReturn(testCatList);

        List<CatAllDTO> result = catController.getAllCatsByLifespan("10");

        assertEquals(testCatList, result);
        verify(catService).getAllCatsByLifespan("10");
    }

    @Test
    public void testGetAllCatsByCoat() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getAllCatsByCoat(anyString())).thenReturn(testCatList);

        List<CatAllDTO> result = catController.getAllCatsByCoat("short");

        assertEquals(testCatList, result);
        verify(catService).getAllCatsByCoat("short");
    }

    @Test
    public void testGetAllCatsByColor() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getAllCatsByColor(anyString())).thenReturn(testCatList);

        List<CatAllDTO> result = catController.getAllCatsByCoatColor("black");

        assertEquals(testCatList, result);
        verify(catService).getAllCatsByColor("black");
    }

    @Test
    public void testGetAllCatsByFirstLetter() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getAllCatsByFirstLetter(anyString())).thenReturn(testCatList);

        List<CatAllDTO> result = catController.getAllCatsByStartName("B");

        assertEquals(testCatList, result);
        verify(catService).getAllCatsByFirstLetter("B");
    }

    @Test
    public void testGetAllCatsSearched() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getSearchCats(anyString())).thenReturn(testSearchResultList);

        ResponseEntity<List<SearchResultCatDTO>> response = catController.getAllDogsSearched("Whiskers");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testSearchResultList, response.getBody());
        verify(catService).getSearchCats("Whiskers");
    }

    @Test
    public void testGetAllCatsSearchedNotFound() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(catService.getSearchCats(anyString())).thenReturn(Collections.emptyList());

        ResponseEntity<List<SearchResultCatDTO>> response = catController.getAllDogsSearched("Unknown");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(catService).getSearchCats("Unknown");
    }
}

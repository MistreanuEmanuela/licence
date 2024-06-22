package com.example.PetPulse.controllers;
import com.example.PetPulse.models.dto.UsersPet.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.dto.UsersPet.SearchPetDTO;
import com.example.PetPulse.models.entities.UserPet;
import com.example.PetPulse.services.UserPetServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class UsersPetControllerTest {

    @Mock
    private UserPetServiceImp userPetServiceImp;
    private UserPet testPet;
    @Mock
    private Authentication authentication;

    @InjectMocks
    private UsersPetController usersPetController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void uploadAnimal() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        PetDTO pet = new PetDTO("test", "test", "test", "test", 10.0, "118377ryewisb", "no", "male", "public", "/wedjhifd", "cat", null);
        when(authentication.getName()).thenReturn("user1");
        usersPetController.uploadAnimal(pet, authentication);
        verify(userPetServiceImp, times(1)).savePet(any(PetDTO.class), eq("user1"));
    }

    @Test
    void allMyPets() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Long id = 1L;
        List<AllPetDTO> pets = Collections.singletonList(new AllPetDTO());

        when(authentication.getName()).thenReturn("testuser");

        when(userPetServiceImp.findAllPet("testuser")).thenReturn(pets);

        List<AllPetDTO> result = usersPetController.allMyPets(authentication);

        assertEquals(pets, result);
    }

    @Test
    void allNumberOfPets() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        String username = "user1";
        when(authentication.getName()).thenReturn(username);

        Long nrPets = null;
        when(userPetServiceImp.findNumberOfPets(authentication.getName())).thenReturn(nrPets);

        Long responseEntity = usersPetController.allNumberOfPets(authentication);

        assertEquals(responseEntity, nrPets);
        verify(userPetServiceImp).findNumberOfPets(authentication.getName());
    }


    @Test
    void findPet() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(userPetServiceImp.findPet(anyLong())).thenReturn(testPet);
        UserPet result = userPetServiceImp.findPet(1L);
        assertEquals(testPet, result);
        verify(userPetServiceImp).findPet(1L);
    }

    @Test
    public void deletePet() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(authentication.getName()).thenReturn("user1");
        when(userPetServiceImp.deletePet(anyLong(), eq("user1"))).thenReturn(true);

        ResponseEntity<String> response = usersPetController.deletePet(1L, authentication);

        assertEquals("Pet deleted successfully", response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getAllPetsSearched() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        String username = "user1";
        when(authentication.getName()).thenReturn(username);

        List<SearchPetDTO> searchResult = new ArrayList<>();
        SearchPetDTO search1 = new SearchPetDTO(1L, null, "test", null, null, null, null, null, null, null,null);
        SearchPetDTO search2 = new SearchPetDTO(2L, null, null, null, null, null, null, null, null, null,null);

        searchResult.add(search1);
        searchResult.add(search2);
        when(userPetServiceImp.searchPets("test", "user1")).thenReturn(searchResult);

        ResponseEntity<List<SearchPetDTO>> result = usersPetController.getAllPetsSearched("test", authentication);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(searchResult, result.getBody());
    }
}
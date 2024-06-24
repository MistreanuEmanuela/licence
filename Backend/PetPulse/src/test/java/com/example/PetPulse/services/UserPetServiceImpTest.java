package com.example.PetPulse.services;

import com.example.PetPulse.Exception.Pet.PetNotFoundException;
import com.example.PetPulse.models.dto.UsersPet.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.EditPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.dto.UsersPet.SearchPetDTO;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.models.entities.UserPet;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersPetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class UserPetServiceImpTest {
    
    @Mock
    private UsersPetRepository usersPetRepository;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserPetServiceImp userPetServiceImp;

    private UserPet pet;
    private UserPet actualPet;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        MockitoAnnotations.openMocks(this);

        String username = "test";
        Long userId = 1L;
        when(userRepository.findIdByUsername(username)).thenReturn(userId);

    }

    @Test
    void savePet() {
        PetDTO pet = new PetDTO("testPet","testBreed","decription", "color", 1.2, "1327862e871", "allergies", "male", "public", " ", "cat", new Date());
        assertDoesNotThrow(() -> userPetServiceImp.savePet(pet,"test"));
        verify(usersPetRepository, times(1)).save(any());
    }

    @Test
    void findAllPet() {
        List<UserPet> userPetList= new ArrayList<>();
        UserPet userPet = new UserPet();
        UserPet userPet1= new UserPet();
        userPetList.add(userPet1);
        userPetList.add(userPet);
        when(usersPetRepository.findAllPet(1L)).thenReturn(userPetList);
        List<AllPetDTO> pets = userPetServiceImp.findAllPet("test");
        assertNotNull(pets);
        assertEquals(userPetList.size(), pets.size());
    }


    @Test
    void testPetNotFound() {
        Long idPet = 1L;
        when(usersPetRepository.findUserPetById(idPet)).thenReturn(null);
        EditPetDTO editPetDTO = new EditPetDTO(1L, " ", " ", 1.2, " ", new Date() , "public", "827982dwsf" );

        PetNotFoundException exception = assertThrows(PetNotFoundException.class, () -> {
            userPetServiceImp.editPet(editPetDTO);
        });

        assertEquals("The pet with the provided ID doesn't exist", exception.getMessage());
    }

    @Test
    void testBirthdateInFuture() {
        UserPet userPet = new UserPet(1L, "test", " ", " "," ", 1.0, " ", " ", " ", "public"," ", " ", new Date());
        EditPetDTO editPetDTO = new EditPetDTO(1L, " ", " ", 1.2, " ", new Date() , "public", "827982dwsf" );
        editPetDTO.setBirthdate(new Date(System.currentTimeMillis() + 86400000));
        Long idPet = 1L;
        when(usersPetRepository.findUserPetById(idPet)).thenReturn(userPet);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userPetServiceImp.editPet(editPetDTO);
        });

        assertEquals("Birthdate cannot be in the future", exception.getMessage());
    }

    @Test
    void testInvalidName() {
        UserPet userPet = new UserPet(1L, "test", " ", " "," ", 1.0, " ", " ", " ", "public"," ", " ", new Date());
        EditPetDTO editPetDTO = new EditPetDTO(1L, " ", " ", 1.2, " ", new Date() , "public", "827982dwsf" );
        editPetDTO.setName("Buddy123");
        Long idPet = 1L;
        when(usersPetRepository.findUserPetById(idPet)).thenReturn(userPet);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userPetServiceImp.editPet(editPetDTO);
        });

        assertEquals("Name can only contain letters", exception.getMessage());
    }

    @Test
    void testInvalidWeight() {
        UserPet userPet = new UserPet(1L, "test", " ", " "," ", 1.0, " ", " ", " ", "public"," ", " ", new Date());
        EditPetDTO editPetDTO = new EditPetDTO(1L, " ", " ", 1.2, " ", new Date() , "public", "827982dwsf" );

        editPetDTO.setWeight(-1.0);
        Long idPet = 1L;
        when(usersPetRepository.findUserPetById(idPet)).thenReturn(userPet);
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userPetServiceImp.editPet(editPetDTO);
        });

        assertEquals("Weight must be greater than 0", exception.getMessage());
    }

    @Test
    void editPet() {
        UserPet userPet = new UserPet(1L, "test", " ", " "," ", 1.0, " ", " ", " ", "public"," ", " ", new Date());
        EditPetDTO editPetDTO = new EditPetDTO(1L, " ", " ", 1.2, " ", new Date() , "public", "827982dwsf" );
        Long idPet = 1L;
        when(usersPetRepository.findUserPetById(idPet)).thenReturn(userPet);
        assertDoesNotThrow(() -> userPetServiceImp.editPet(editPetDTO));
        verify(usersPetRepository, times(1)).save(any());
    }

    @Test
    void findPet() {
        Long id = 1L;
        UserPet userPet = new UserPet(1L, "test", " ", " "," ", 1.0, " ", " ", " ", "public"," ", " ", new Date());
        when(usersPetRepository.findUserPetById(id)).thenReturn(userPet);
        UserPet userPetResult= userPetServiceImp.findPet(id);
        assertNotNull(userPetResult);
        assertEquals(userPet, userPetResult);
    }

    @Test
    void deletePet() {
        Long id = 1L;
        UserPet userPet = new UserPet(1L, "test", " ", " "," ", 1.0, " ", " ", " ", "public"," ", " ", new Date());
        when(usersPetRepository.findUserPetById(id)).thenReturn(userPet);
        boolean result = userPetServiceImp.deletePet(id, "test");
        assertTrue(result);
        verify(usersPetRepository, times(1)).deleteById(id);
    }

    @Test
    void searchPets() {
        Long id = 1L;
        List<UserPet> userPetList = new ArrayList<>();
        UserPet userPet = new UserPet(1L, "test", " ", " ", " ", 1.0, " ", " ", " ", "public", "ndkjh", "cat", new Date());
        userPetList.add(userPet);
        when(usersPetRepository.findByName("test", id)).thenReturn(userPetList);
        User user = new User(id, "test", "test", "test");
        when(userRepository.findIdByUsername("test")).thenReturn(id);
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        List<SearchPetDTO> searchPetDTOS = userPetServiceImp.searchPets("name", "test");
        assertNotNull(searchPetDTOS);
    }

    @Test
    void findNumberOfPets() {
        Long id = 1L;
        when(userRepository.findIdByUsername("test")).thenReturn(id);
        when(usersPetRepository.findPetsNumber(id)).thenReturn(2L);
        Long nrPetsResult = userPetServiceImp.findNumberOfPets("test");
        assertNotNull(nrPetsResult);
        assertEquals(2L, nrPetsResult);

    }
}
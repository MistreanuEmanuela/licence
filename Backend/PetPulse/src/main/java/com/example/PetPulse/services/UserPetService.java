package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.UsersPet.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.EditPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.entities.UserPet;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserPetService {
    String savePicture(String username, MultipartFile file);
    void savePet(PetDTO dog, String username);

    List<AllPetDTO> findAllPet(String username);
    byte[] getPetPicture(String path);
    void editPet(EditPetDTO pet);

    UserPet findPet(Long id);
    boolean deletePet(Long id, String username);
}

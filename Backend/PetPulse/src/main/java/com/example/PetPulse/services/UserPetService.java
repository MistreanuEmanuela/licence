package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UserPetService {
    String savePicture(String username, MultipartFile file);
    void savePet(PetDTO dog, String username);
}

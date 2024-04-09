package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.UsersDog.DogDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UserDogService {
    String saveDogPicture(String username, MultipartFile file);
    void saveDog(DogDTO dog, String username);
}

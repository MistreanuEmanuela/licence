package com.example.PetPulse.services;


import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.entities.Dog;

import java.io.IOException;
import java.util.List;

public interface DogService {
    Dog getDog(long id);

    byte[] getDogPicture( String name);

    List<DogAllDTO> getAllDogs();
    List<DogAllDTO> getAllDogsBySize(String size);
}

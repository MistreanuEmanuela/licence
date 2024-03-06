package com.example.PetPulse.services;


import com.example.PetPulse.models.entities.Dog;

import java.io.IOException;

public interface DogService {
    Dog getDog(long id);

    byte[] getDogPicture( String name);
}

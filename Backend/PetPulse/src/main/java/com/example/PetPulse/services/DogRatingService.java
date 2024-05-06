package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.FormsBestFit.DogFormDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;
import com.example.PetPulse.models.entities.DogRating;

public interface DogRatingService {
    DogRatingDTO getDogRating(long id);

    DogRating getBestFit(DogFormDTO form);

}

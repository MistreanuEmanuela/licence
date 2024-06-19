package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.DogRating.DogRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.DogFormDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;

public interface DogRatingService {
    DogRatingDTO getDogRating(long id);

    DogRatingsCompleteDTO getBestFit(DogFormDTO form);

}

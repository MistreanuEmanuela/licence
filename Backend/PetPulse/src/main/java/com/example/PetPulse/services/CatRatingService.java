package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.FormCat;
import com.example.PetPulse.models.entities.CatRating;

public interface CatRatingService {

    CatRatingDTO getCatRating(Long id);

    CatRatingsCompleteDTO getBestFit(FormCat form);
}

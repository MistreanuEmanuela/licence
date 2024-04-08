package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;

public interface CatRatingService {

    CatRatingDTO getCatRating(Long id);
}

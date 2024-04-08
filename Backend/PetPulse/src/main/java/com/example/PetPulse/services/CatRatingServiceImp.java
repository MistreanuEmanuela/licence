package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.entities.CatRating;
import com.example.PetPulse.repositories.CatRatingRepository;
import com.example.PetPulse.repositories.CatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CatRatingServiceImp  implements CatRatingService{

    private final CatRatingRepository catRatingRepository;
    @Autowired
    public CatRatingServiceImp(CatRatingRepository catRatingRepository) {
        this.catRatingRepository = catRatingRepository;
    }

    @Override
    public CatRatingDTO getCatRating(Long id) {
        CatRating catRating =catRatingRepository.findInfoById(id);
        return new CatRatingDTO(catRating.getId(), catRating.getAffection(), catRating.getPlayfulness(), catRating.getKidFriendly(), catRating.getIntelligence(), catRating.getPetFriendly(), catRating.getGroom(), catRating.getStrangers());
    }
}


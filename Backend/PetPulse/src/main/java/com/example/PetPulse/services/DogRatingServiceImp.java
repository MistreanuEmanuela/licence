package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;
import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.models.entities.DogRating;
import com.example.PetPulse.models.entities.QuickInfoDog;
import com.example.PetPulse.repositories.DogRatingRepository;
import com.example.PetPulse.repositories.QuickInfoDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DogRatingServiceImp implements DogRatingService{
    private final DogRatingRepository dogRatingRepository;
    @Autowired
    public DogRatingServiceImp(DogRatingRepository dogRatingRepository) {
        this.dogRatingRepository = dogRatingRepository;
    }

    @Override
    public DogRatingDTO getDogRating(long id) {
        DogRating dogRating = dogRatingRepository.findInfoById(id);
        DogRatingDTO dogRatingDTO = new DogRatingDTO(dogRating.getIdDog(), dogRating.getApartmentLiving(),dogRating.getSensibility(),dogRating.getAlone(), dogRating.getAffection(), dogRating.getSize(), dogRating.getIntelligence(), dogRating.getPlayfulness());
        return dogRatingDTO;
    }
}

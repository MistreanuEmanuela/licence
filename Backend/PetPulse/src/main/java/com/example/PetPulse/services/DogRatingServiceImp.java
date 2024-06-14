package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.FormsBestFit.DogFormDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;
import com.example.PetPulse.models.entities.DogRating;
import com.example.PetPulse.repositories.DogRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return new DogRatingDTO(dogRating.getIdDog(), dogRating.getApartmentLiving(),dogRating.getSensibility(),dogRating.getAlone(), dogRating.getAffection(), dogRating.getSize(), dogRating.getIntelligence(), dogRating.getPlayfulness());
    }

    @Override
    public DogRating getBestFit(DogFormDTO form) {
        List<DogRating> dogs = dogRatingRepository.findAll();

        Map<DogRating, Integer> dogScores = new HashMap<>();

        for (DogRating dogRating : dogs) {
            int score = 0;
            if (form.isAppartementLiving()) {
                score += 2 * dogRating.getApartmentLiving() + 2 * (5 - dogRating.getBark());
            } else {
                score += 2 * 5 + 2 * 5;
            }
            if (form.isTravel()) {
                score += 2 * (dogRating.getAlone()) + 2 * (dogRating.getStrangersFriendly());
            } else {
                score += 2 * 5 + 2 * 5;
            }
            if (form.isKids()) {
                score += 2 * (dogRating.getKidFriendly()) + 2 * (5 * dogRating.getShedding()) + 2 * (dogRating.getPlayfulness()) + 2 * (5 - dogRating.getMouthiness());
            } else {
                score += 2 * 5 + 2 * 5 + 2 * 5 +2 * 5;
            }
            if (form.isDogs()) {
                score += 2 * dogRating.getDogFriendly();
            } else {
                score += 2 * 5;
            }
            if (form.isTimeForCare()) {
                score += 2 * 5 + 2 * 5;
            } else {
                score += 2 * (5 - dogRating.getSensibility()) + 2 * (5 - dogRating.getGroom());
            }
            if (form.isDisponibilityForBuyingMedicine()) {
                score += 2 * 5;
            } else {
                score += 2 * (dogRating.getHealthy());
            }
            if (form.isTimeForExercise()) {
                score += 2 * 5;
            } else {
                score += 2 * (5 - dogRating.getExercise());
            }
            if (form.isBig()) {
                score += dogs.size();
            } else {
                score += 5 - dogRating.getSize();
            }

            if (form.isTrain()) {
                score += dogRating.getTrainability();
            } else {
                score += 5;
            }
            if (form.isEnergy()) {
                score += dogRating.getExercise();
            } else {
                score += 5 - dogRating.getEnergy();
            }
            if (form.isPlayfulness()) {
                score += dogRating.getPlayfulness();
            } else {
                score += 5 - dogRating.getPlayfulness();
            }
            dogScores.put(dogRating, score);
        }
        List<Map.Entry<DogRating, Integer>> sortedScores = new ArrayList<>(dogScores.entrySet());
        sortedScores.sort((a, b) -> b.getValue().compareTo(a.getValue()));
        return sortedScores.get(0).getKey();
    }
}

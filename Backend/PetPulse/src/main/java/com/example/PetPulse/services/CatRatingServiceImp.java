package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingsCompleteDTO;
import com.example.PetPulse.models.dto.FormsBestFit.FormCat;
import com.example.PetPulse.models.entities.CatRating;
import com.example.PetPulse.repositories.CatRatingRepository;
import com.example.PetPulse.repositories.CatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CatRatingServiceImp  implements CatRatingService{

    private final CatRatingRepository catRatingRepository;
    private CatRepository catRepository;
    @Autowired
    public CatRatingServiceImp(CatRatingRepository catRatingRepository, CatRepository catRepository) {
        this.catRatingRepository = catRatingRepository;
        this.catRepository = catRepository;
    }

    @Override
    public CatRatingDTO getCatRating(Long id) {
        CatRating catRating = catRatingRepository.findInfoById(id);
        return new CatRatingDTO(catRating.getId(), catRating.getAffection(), catRating.getPlayfulness(), catRating.getKidFriendly(),catRating.getIntelligence(), catRating.getPetFriendly(), catRating.getGroom(), catRating.getStrangers());
    }

    @Override
    public CatRatingsCompleteDTO getBestFit(FormCat form) {
        List<CatRating> cats = catRatingRepository.findAll();

        Map<CatRating, Integer> catScores = new HashMap<>();

        for (CatRating catRating : cats) {
            int score = 0;

            if (form.isOtherPet()) {
                score += 2 * catRating.getPetFriendly();
            } else {
                score += 2 * 5;
            }

            if (form.isFrequentTravels()) {
                score += 2 * catRating.getStrangers();
            } else {
                score += 2 * 5;
            }

            if (form.isKids()) {
                score += 2 * catRating.getKidFriendly() + 2 * catRating.getPlayfulness() + 2 * (5 - catRating.getShedding());
            } else {
                score += 2 * 5;
            }

            if (form.isFreeTimeToAccord()) {
                score += 2 * 5;
            } else {
                score += 2 * catRating.getGroom();
            }

            score += 5 - Math.abs(form.getAffection() - catRating.getAffection());
            score += 5 - Math.abs(form.getPlayfulness() - catRating.getPlayfulness());
            score += 5 - Math.abs(form.getIntelligence() - catRating.getIntelligence());

            if (form.isProblemWithCatHair()) {
                score += 5 - catRating.getShedding();
            } else {
                score += catRating.getShedding();
            }

            catScores.put(catRating, score);
        }

        List<Map.Entry<CatRating, Integer>> sortedScores = new ArrayList<>(catScores.entrySet());
        sortedScores.sort((a, b) -> b.getValue().compareTo(a.getValue()));
        CatRating catResult = sortedScores.get(0).getKey();
        String name = catRepository.findById(catResult.getIdCat()).getName();
        CatRatingsCompleteDTO catRatingsCompleteDTO = new CatRatingsCompleteDTO(catResult.getId(),name, catResult.getIdCat(), catResult.getAffection(), catResult.getShedding(), catResult.getPlayfulness(), catResult.getKidFriendly(), catResult.getIntelligence(), catResult.getPetFriendly(), catResult.getGroom(), catResult.getStrangers(), catResult.getVocalize(), catResult.getHealth() );
        return catRatingsCompleteDTO;
    }
}


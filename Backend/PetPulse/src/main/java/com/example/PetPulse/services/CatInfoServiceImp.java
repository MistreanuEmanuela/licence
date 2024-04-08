package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;
import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.models.entities.QuickInfoCat;
import com.example.PetPulse.models.entities.QuickInfoDog;
import com.example.PetPulse.repositories.QuickInfoCatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CatInfoServiceImp implements CatInfoService{
    private final QuickInfoCatRepository quickInfoCatRepository;

    @Autowired
    public CatInfoServiceImp(QuickInfoCatRepository quickInfoCatRepository) {
        this.quickInfoCatRepository = quickInfoCatRepository;
    }

    @Override
    public QuickInfoCatDTO getCatInfo(long id) {
        QuickInfoCat quick = quickInfoCatRepository.findInfoById(id);
        return new QuickInfoCatDTO(quick.getIdCat(), quick.getOrigin(), quick.getSize(), quick.getLifespan(), quick.getCoat(), quick.getTemperament() );
    }
    }


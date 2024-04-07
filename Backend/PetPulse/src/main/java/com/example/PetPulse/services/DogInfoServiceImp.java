package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.models.entities.QuickInfoDog;
import com.example.PetPulse.repositories.DogRepository;
import com.example.PetPulse.repositories.QuickInfoDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DogInfoServiceImp implements DogInfoService {
    private final QuickInfoDogRepository quickInfoDogRepository;
    @Autowired
    public DogInfoServiceImp(QuickInfoDogRepository quickInfoDogRepository) {
        this.quickInfoDogRepository = quickInfoDogRepository;
    }

    @Override
    public QuickInfoDogDTO getDogInfo(long id) {
        QuickInfoDog quick = quickInfoDogRepository.findInfoById(id);
        QuickInfoDogDTO quickInfoDogDTO = new QuickInfoDogDTO(quick.getIdDog(), quick.getOrigin(), quick.getSize(),quick.getLifespan(),quick.getCoat());
        return quickInfoDogDTO;
    }
}

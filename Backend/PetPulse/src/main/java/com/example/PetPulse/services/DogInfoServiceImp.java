package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.models.entities.QuickInfoDog;
import com.example.PetPulse.repositories.DogRepository;
import com.example.PetPulse.repositories.QuickInfoDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DogInfoServiceImp implements DogInfoService {
    private final QuickInfoDogRepository quickInfoDogRepository;
    @Autowired
    public DogInfoServiceImp(QuickInfoDogRepository quickInfoDogRepository) {
        this.quickInfoDogRepository = quickInfoDogRepository;
    }

    @Override
    public Optional<QuickInfoDogDTO> getDogInfo(long id) {
        Optional<QuickInfoDog> quickOptional = quickInfoDogRepository.findInfoById(id);

        if (quickOptional.isPresent()) {
            QuickInfoDog quick = quickOptional.get();
            QuickInfoDogDTO quickInfoDogDTO = new QuickInfoDogDTO(
                    quick.getIdDog(),
                    quick.getOrigin(),
                    quick.getSize(),
                    quick.getLifespan(),
                    quick.getCoat(),
                    quick.getTemperament()
            );
            return Optional.of(quickInfoDogDTO);
        } else {
            return Optional.empty();
        }
    }
}

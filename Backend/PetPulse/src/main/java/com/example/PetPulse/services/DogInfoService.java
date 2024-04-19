package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import org.springframework.stereotype.Service;

import java.util.Optional;


public interface DogInfoService {
    Optional<QuickInfoDogDTO> getDogInfo(long id);
}

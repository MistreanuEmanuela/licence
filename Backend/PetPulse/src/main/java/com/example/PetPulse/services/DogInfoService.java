package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import org.springframework.stereotype.Service;


public interface DogInfoService {
    QuickInfoDogDTO getDogInfo(long id);
}

package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;

public interface CatInfoService {
    QuickInfoCatDTO getCatInfo(long id);
}

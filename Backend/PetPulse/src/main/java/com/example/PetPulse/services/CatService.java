package com.example.PetPulse.services;
import com.example.PetPulse.models.dto.CatDTO.CatAllDTO;
import com.example.PetPulse.models.entities.Cat;

import java.util.List;

public interface CatService {
    Cat getCat(long id);

    byte[] getCatPicture( String name);

    List<CatAllDTO> getAllCats();
    List<CatAllDTO> getAllCatsBySize(String size);
    List<CatAllDTO> getAllCatsByLifespan(String lifespan);

    List<CatAllDTO> getAllCatsByCoat(String coat);

    List<CatAllDTO> getAllCatsByColor(String color);

    List<CatAllDTO> getAllCatsByFirstLetter(String letter);
}

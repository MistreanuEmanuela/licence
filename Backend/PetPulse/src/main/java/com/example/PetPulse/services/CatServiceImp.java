package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.CatDTO.CatAllDTO;
import com.example.PetPulse.models.entities.Cat;
import com.example.PetPulse.repositories.CatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatServiceImp  implements CatService{
    private final CatRepository catRepository;

    @Autowired
    public CatServiceImp(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    @Override
    public Cat getCat(long id) {
        return catRepository.findById(id);
    }

    @Override
    public byte[] getCatPicture(String name) {
        String path = "D:\\cats\\" + name + ".png";
        Path filePath = Paths.get(path);
        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<CatAllDTO> getAllCats() {
        List<Cat> cats = catRepository.findAllCats();
        return cats.stream()
                .map(dog -> new CatAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatAllDTO> getAllCatsBySize(String size) {
        List<Cat> cats = catRepository.findAllCatsBySize(size);
        return cats.stream()
                .map(dog -> new CatAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatAllDTO> getAllCatsByLifespan(String lifespan) {
        List<Cat> cats = catRepository.findAllCatsByLifespan(lifespan);
        return cats.stream()
                .map(dog -> new CatAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatAllDTO> getAllCatsByCoat(String coat) {
        List<Cat> cats = catRepository.findAllCatsByCoatType(coat);
        return cats.stream()
                .map(dog -> new CatAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatAllDTO> getAllCatsByColor(String color) {
        List<Cat> cats = catRepository.findCatsByCoatColor(color);
        return cats.stream()
                .map(dog -> new CatAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatAllDTO> getAllCatsByFirstLetter(String letter) {
        List<Cat> cats = catRepository.findCatsByNameStartingWithLetter(letter);
        return cats.stream()
                .map(dog -> new CatAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
    }
}

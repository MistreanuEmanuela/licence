package com.example.PetPulse.services;


import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.entities.Dog;
import com.example.PetPulse.repositories.DogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;


import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DogServiceImp implements DogService {
    private final DogRepository dogRepository;

    @Autowired
    public DogServiceImp(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    @Override
    public Dog getDog(long id) {
        return dogRepository.findById(id);
    }

    @Override
    public byte[] getDogPicture(String name) {
        String path = "D:\\dogs\\" + name + ".png";
        Path filePath = Paths.get(path);
        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<DogAllDTO> getAllDogs() {
        List<Dog> dogs = dogRepository.findAllDogs();
        List<DogAllDTO> dogDTOs = dogs.stream()
                .map(dog -> new DogAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
        return dogDTOs;

    }

    @Override
    public List<DogAllDTO> getAllDogsBySize(String size) {
        List<Dog> dogs = dogRepository.findAllDogsBySize(size);
        List<DogAllDTO> dogDTOs = dogs.stream()
                .map(dog -> new DogAllDTO(dog.getId(), dog.getName()))
                .collect(Collectors.toList());
        return dogDTOs;

    }
}

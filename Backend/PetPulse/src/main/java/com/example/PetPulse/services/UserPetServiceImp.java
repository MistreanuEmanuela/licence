package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.entities.UserPet;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersPetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserPetServiceImp implements UserPetService {
    private final UsersPetRepository usersPetRepository;

    @Autowired UserRepository userRepository;
    @Autowired
    public UserPetServiceImp(UsersPetRepository usersPetRepository) {
        this.usersPetRepository = usersPetRepository;
    }

    @Override
    public String savePicture(String username, MultipartFile file) {
        try {
            Long userId = userRepository.findIdByUsername(username);

            String fileName = new Date().getTime() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("D://pet/" + username);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            return filePath.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void savePet(PetDTO dog, String username) {
        Long id = userRepository.findIdByUsername(username);
        UserPet userPet = new UserPet(id, dog.getName(), dog.getBreed(), dog.getDescription(), dog.getColor(), dog.getWeight(), dog.getMicrochipId(), dog.getAllergies(), dog.getGender(), dog.getAge(), dog.getVisibility(), dog.getImagePath(), dog.getAnimalType());
        System.out.println(userPet);
        usersPetRepository.save(userPet);
    }

    @Override
    public List<AllPetDTO> findAllPet(String username) {
        Long id = userRepository.findIdByUsername(username);
        List<UserPet> pets = usersPetRepository.findAllPet(id);
        return pets.stream()
                .map(pet -> new AllPetDTO(pet.getId(), pet.getName(), pet.getBreed(), pet.getColor(), pet.getGender(), pet.getAge(), pet.getImagePath(), pet.getAnimalType()))
                .collect(Collectors.toList());
    }
    @Override
    public byte[] getPetPicture(String path) {
        Path filePath = Path.of(path);
        System.out.println(filePath);
        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.UsersDog.DogDTO;
import com.example.PetPulse.models.entities.UserDog;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersDogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@Service
public class UserDogServiceImp implements UserDogService {
    private final UsersDogsRepository usersDogsRepository;

    @Autowired UserRepository userRepository;
        @Autowired
        public UserDogServiceImp(UsersDogsRepository usersDogsRepository) {
            this.usersDogsRepository = usersDogsRepository;
        }

    @Override
    public String saveDogPicture(String username, MultipartFile file) {
        try {
            Long userId = userRepository.findIdByUsername(username);

            String fileName = new Date().getTime() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("D://doggy/" + username);
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
    public void saveDog(DogDTO dog, String username) {
        Long id = userRepository.findIdByUsername(username);
        UserDog userDog = new UserDog(id, dog.getName(), dog.getBreed(), dog.getDescription(), dog.getColor(), dog.getWeight(), dog.getMicrochipId(), dog.getAllergies(), dog.getGender(), dog.getAge(), dog.getVisibility(), dog.getImagePath());
        System.out.println(userDog);
        usersDogsRepository.save(userDog);
    }

}

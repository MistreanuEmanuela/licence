package com.example.PetPulse.services;

import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.Exception.Pet.PetNotFoundException;
import com.example.PetPulse.models.dto.DogDTO.SearchResultDogDTO;
import com.example.PetPulse.models.dto.UsersPet.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.EditPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.dto.UsersPet.SearchPetDTO;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.models.entities.UserPet;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersPetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserPetServiceImp implements UserPetService {
    private UsersPetRepository usersPetRepository;

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
        Date today = new Date();
        Date birthdate = dog.getBirthdate();
        if (birthdate.after(today)) {
            throw new GeneralException("Birthdate cannot be in the future");
        }
        String name = dog.getName();
        if (!name.matches("[a-zA-Z ]+")) {
            throw new GeneralException("Name can only contain letters");
        }
        if (dog.getWeight() <= 0) {
            throw new GeneralException("Weight must be greater than 0");
        }
        Long id = userRepository.findIdByUsername(username);
        UserPet userPet = new UserPet(id, dog.getName(), dog.getBreed(), dog.getDescription(), dog.getColor(), dog.getWeight(), dog.getMicrochipId(), dog.getAllergies(), dog.getGender(), dog.getVisibility(), dog.getImagePath(), dog.getAnimalType(), dog.getBirthdate());
        usersPetRepository.save(userPet);
    }

    @Override
    public List<AllPetDTO> findAllPet(String username) {
        Long id = userRepository.findIdByUsername(username);
        List<UserPet> pets = usersPetRepository.findAllPet(id);
        return pets.stream()
                .map(pet -> new AllPetDTO(pet.getId(), pet.getName(), pet.getBreed(), pet.getColor(), pet.getGender(), pet.getBirthdate(), pet.getImagePath(), pet.getAnimalType()))
                .collect(Collectors.toList());
    }


    @Override
    public byte[] getPetPicture(String path) {
        Path filePath = Path.of(path);
        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public void editPet(EditPetDTO pet) {
        UserPet actualPet = usersPetRepository.findUserPetById(pet.getId());
        if (actualPet == null) {
            throw new PetNotFoundException("The pet with the provided ID doesn't exist");
        }

        Date today = new Date();
        Date birthdate = pet.getBirthdate();
        if (birthdate.after(today)) {
            throw new IllegalArgumentException("Birthdate cannot be in the future");
        }

        String name = pet.getName();
        if (!name.matches("[a-zA-Z ]+")) {
            throw new IllegalArgumentException("Name can only contain letters");
        }

        if (pet.getWeight() <= 0) {
            throw new IllegalArgumentException("Weight must be greater than 0");
        }

        actualPet.setBirthdate(pet.getBirthdate());
        actualPet.setName(pet.getName());
        actualPet.setAllergies(pet.getAllergies());
        actualPet.setDescription(pet.getDescription());
        actualPet.setVisibility(pet.getVisibility());
        actualPet.setWeight(pet.getWeight());

        usersPetRepository.save(actualPet);
    }

    @Override
    public UserPet findPet(Long id) {
        UserPet actualPet = usersPetRepository.findUserPetById(id);
        if (actualPet != null) {
            return actualPet;
        }
        else {
            throw new PetNotFoundException("The pet with provide id doesn't exist");
        }
    }

    @Override
    public boolean deletePet(Long id, String username) {
        UserPet actualPet = usersPetRepository.findUserPetById(id);
        Long idUser = userRepository.findIdByUsername(username);

        if (actualPet == null || !idUser.equals(actualPet.getUserId())) {
            return false;
        }

        String imagePath = actualPet.getImagePath();


        if (imagePath != null && !imagePath.isEmpty()) {
            File imageFile = new File(imagePath);
             if (imageFile.exists()) {
                 imageFile.delete();
             }
        }
        usersPetRepository.deleteById(id);
        return true;
    }

    @Override
    public List<SearchPetDTO> searchPets(String breed, String username) {
        Long userId = userRepository.findIdByUsername(username);
        List<UserPet> pets = usersPetRepository.findByName(breed, userId);
        List<SearchPetDTO> petsSearch = pets.stream()
                .map(pet -> {
                    User user = userRepository.findById(pet.getUserId()).orElse(null);
                    if (user != null) {
                        return new SearchPetDTO(
                                pet.getId(),
                                pet.getName(),
                                pet.getBreed(),
                                pet.getColor(),
                                pet.getGender(),
                                pet.getBirthdate(),
                                pet.getImagePath(),
                                pet.getAnimalType(),
                                user.getFirstName(),
                                user.getLastName(),
                                pet.getDescription()
                        );
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return petsSearch;
    }

    @Override
    public Long findNumberOfPets(String username) {
        Long id = userRepository.findIdByUsername(username);
        Long nrPets = usersPetRepository.findPetsNumber(id);
        return nrPets;
    }
}

package com.example.PetPulse.models.dto.UsersPet;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class SearchPetDTO {
    private Long id;
    private String name;
    private String breed;
    private String color;
    private String gender;
    private Date birthdate;
    private String imagePath;
    private String animalType;
    private String FirstNameOwner;
    private String LastNameOwner;

    public SearchPetDTO(Long id, String name, String breed, String color, String gender, Date birthdate, String imagePath, String animalType, String firstNameOwner, String lastNameOwner) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.color = color;
        this.gender = gender;
        this.birthdate = birthdate;
        this.imagePath = imagePath;
        this.animalType = animalType;
        this.FirstNameOwner = firstNameOwner;
        this.LastNameOwner = lastNameOwner;
    }

    public SearchPetDTO() {
    }
}

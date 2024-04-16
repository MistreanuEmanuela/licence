package com.example.PetPulse.models.dto.UsersPet;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AllPetDTO {
    private Long id;
    private String name;
    private String breed;
    private String color;
    private String gender;
    private Date age;
    private String imagePath;
    private String animalType;

    public AllPetDTO(Long id, String name, String breed, String color, String gender, Date age, String imagePath, String animalType) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.color = color;
        this.gender = gender;
        this.age = age;
        this.animalType = animalType;
        this.imagePath = imagePath;
    }
}

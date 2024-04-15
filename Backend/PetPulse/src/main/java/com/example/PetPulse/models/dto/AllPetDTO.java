package com.example.PetPulse.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllPetDTO {
    private Long id;
    private String name;
    private String breed;
    private String color;
    private String gender;
    private String age;
    private String imagePath;
    private String animalType;

    public AllPetDTO(Long id, String name, String breed, String color, String gender, String age, String imagePath, String animalType) {
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

package com.example.PetPulse.models.dto.UsersPet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetDTO {

    private String name;
    private String breed;

    private String description;

    private String color;

    private Double weight;

    private String microchipId;

    private String allergies;

    private String gender;

    private String age;

    private String visibility;

    private String imagePath;
    private String animalType;

    public PetDTO() {
    }

    public PetDTO(String name, String breed, String description, String color, Double weight, String microchipId, String allergies, String gender, String age, String visibility, String imagePath, String animalType) {
        this.name = name;
        this.breed = breed;
        this.description = description;
        this.color = color;
        this.weight = weight;
        this.microchipId = microchipId;
        this.allergies = allergies;
        this.gender = gender;
        this.age = age;
        this.visibility = visibility;
        this.imagePath = imagePath;
        this.animalType = animalType;
    }
}

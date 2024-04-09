package com.example.PetPulse.models.dto.UsersDog;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DogDTO {

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

    public DogDTO() {
    }

    public DogDTO(String name, String breed, String description, String color, Double weight, String microchipId, String allergies, String gender, String age, String visibility, String imagePath) {
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
    }
}

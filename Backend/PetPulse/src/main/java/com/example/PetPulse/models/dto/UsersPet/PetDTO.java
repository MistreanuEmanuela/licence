package com.example.PetPulse.models.dto.UsersPet;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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

    private String visibility;

    private String imagePath;

    private String animalType;

    private Date birthdate;

    public PetDTO() {
    }

    public PetDTO(String name, String breed, String description, String color, Double weight, String microchipId, String allergies, String gender, String visibility, String imagePath, String animalType, Date birthdate) {
        this.name = name;
        this.breed = breed;
        this.description = description;
        this.color = color;
        this.weight = weight;
        this.microchipId = microchipId;
        this.allergies = allergies;
        this.gender = gender;
        this.visibility = visibility;
        this.imagePath = imagePath;
        this.animalType = animalType;
        this.birthdate = birthdate;
    }

    @Override
    public String toString() {
        return "PetDTO{" +
                "name='" + name + '\'' +
                ", breed='" + breed + '\'' +
                ", description='" + description + '\'' +
                ", color='" + color + '\'' +
                ", weight=" + weight +
                ", microchipId='" + microchipId + '\'' +
                ", allergies='" + allergies + '\'' +
                ", gender='" + gender + '\'' +
                ", visibility='" + visibility + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", animalType='" + animalType + '\'' +
                ", birthdate=" + birthdate +
                '}';
    }
}

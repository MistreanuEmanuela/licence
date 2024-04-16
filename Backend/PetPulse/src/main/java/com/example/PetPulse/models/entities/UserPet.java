package com.example.PetPulse.models.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "users_pet")
public class UserPet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name")
    private String name;

    @Column(name = "breed")
    private String breed;

    @Column(name = "description")
    private String description;

    @Column(name = "color")
    private String color;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "microchip_id")
    private String microchipId;

    @Column(name = "allergies")
    private String allergies;

    @Column(name = "gender")
    private String gender;

    @Column(name = "visibility")
    private String visibility;

    @Column(name = "imagepath")
    private String imagePath;
    @Column(name = "animal_type")
    private String animalType;

    @Column(name = "birthday")
    private Date birthdate;

    public UserPet() {
    }


    public UserPet(Long userId, String name, String breed, String description, String color, Double weight, String microchipId, String allergies, String gender, String visibility, String imagePath, String animalType, Date birthdate) {
        this.userId = userId;
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
        this.birthdate= birthdate;
    }

    @Override
    public String toString() {
        return "UserPet{" +
                "id=" + id +
                ", userId=" + userId +
                ", name='" + name + '\'' +
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

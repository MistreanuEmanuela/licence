package com.example.PetPulse.models.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name = "users_dogs")
public class UserDog {

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

    @Column(name = "age")
    private String age;

    @Column(name = "visibility")
    private String visibility;

    @Column(name = "imagepath")
    private String imagePath;

    public UserDog() {
    }

    public UserDog(Long id, Long userId, String name, String breed, String description, String color, Double weight, String microchipId, String allergies, String gender, String age, String visibility, String imagePath) {
        this.id = id;
        this.userId = userId;
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

    public UserDog(Long userId, String name, String breed, String description, String color, Double weight, String microchipId, String allergies, String gender, String age, String visibility, String imagePath) {
        this.userId = userId;
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

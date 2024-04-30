package com.example.PetPulse.models.entities;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Setter
@Getter

@Entity
@Table(name = "dog_ratings")
public class DogRating {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "id_dog")
    private Integer idDog;

    @Column(name = "name")
    private String name;

    @Column(name = "apartament_living")
    private Integer apartmentLiving;

    @Column(name = "novice_owner")
    private Integer noviceOwner;

    @Column(name = "sensibility")
    private Integer sensibility;

    @Column(name = "alone")
    private Integer alone;

    @Column(name = "cold_water")
    private Integer coldWater;

    @Column(name = "hot_water")
    private Integer hotWater;

    @Column(name = "affection")
    private Integer affection;

    @Column(name = "kid_friendly")
    private Integer kidFriendly;

    @Column(name = "dog_friendly")
    private Integer dogFriendly;

    @Column(name = "strangers_friendly")
    private Integer strangersFriendly;

    @Column(name = "shedding")
    private Integer shedding;

    @Column(name = "drooling")
    private Integer drooling;

    @Column(name = "groom")
    private Integer groom;

    @Column(name = "healthy")
    private Integer healthy;

    @Column(name = "weight_gain")
    private Integer weightGain;

    @Column(name = "size")
    private Integer size;

    @Column(name = "trainability")
    private Integer trainability;

    @Column(name = "intelligence")
    private Integer intelligence;

    @Column(name = "mouthiness")
    private Integer mouthiness;

    @Column(name = "prey_drive")
    private Integer preyDrive;

    @Column(name = "bark")
    private Integer bark;

    @Column(name = "wanderlust")
    private Integer wanderlust;

    @Column(name = "energy")
    private Integer energy;

    @Column(name = "intensity")
    private Integer intensity;

    @Column(name = "exercise")
    private Integer exercise;

    @Column(name = "playfulness")
    private Integer playfulness;


    public DogRating() {
    }

    public DogRating(Integer id, Integer idDog, String name, Integer apartmentLiving, Integer noviceOwner, Integer sensibility, Integer alone, Integer coldWater, Integer hotWater, Integer affection, Integer kidFriendly, Integer dogFriendly, Integer strangersFriendly, Integer shedding, Integer drooling, Integer groom, Integer healthy, Integer weightGain, Integer size, Integer trainability, Integer intelligence, Integer mouthiness, Integer preyDrive, Integer bark, Integer wanderlust, Integer energy, Integer intensity, Integer exercise, Integer playfulness) {
        this.id = id;
        this.idDog = idDog;
        this.name = name;
        this.apartmentLiving = apartmentLiving;
        this.noviceOwner = noviceOwner;
        this.sensibility = sensibility;
        this.alone = alone;
        this.coldWater = coldWater;
        this.hotWater = hotWater;
        this.affection = affection;
        this.kidFriendly = kidFriendly;
        this.dogFriendly = dogFriendly;
        this.strangersFriendly = strangersFriendly;
        this.shedding = shedding;
        this.drooling = drooling;
        this.groom = groom;
        this.healthy = healthy;
        this.weightGain = weightGain;
        this.size = size;
        this.trainability = trainability;
        this.intelligence = intelligence;
        this.mouthiness = mouthiness;
        this.preyDrive = preyDrive;
        this.bark = bark;
        this.wanderlust = wanderlust;
        this.energy = energy;
        this.intensity = intensity;
        this.exercise = exercise;
        this.playfulness = playfulness;
    }
}

package com.example.PetPulse.models.dto.DogRating;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DogRatingsCompleteDTO {
    private Integer id;
    private String name;

    private Integer idDog;

    private Integer apartmentLiving;

    private Integer noviceOwner;

    private Integer sensibility;

    private Integer alone;

    private Integer coldWater;

    private Integer hotWater;
    private Integer affection;

    private Integer kidFriendly;

    private Integer dogFriendly;

    private Integer strangersFriendly;

    private Integer shedding;

    private Integer drooling;

    private Integer groom;

    private Integer healthy;

    private Integer weightGain;

    private Integer size;

    private Integer trainability;

    private Integer intelligence;

    private Integer mouthiness;

    private Integer preyDrive;

    private Integer bark;

    private Integer wanderlust;

    private Integer energy;

    private Integer intensity;

    private Integer exercise;

    private Integer playfulness;

    public DogRatingsCompleteDTO() {
    }

    public DogRatingsCompleteDTO(Integer id, String name, Integer idDog, Integer apartmentLiving, Integer noviceOwner, Integer sensibility, Integer alone, Integer coldWater, Integer hotWater, Integer affection, Integer kidFriendly, Integer dogFriendly, Integer strangersFriendly, Integer shedding, Integer drooling, Integer groom, Integer healthy, Integer weightGain, Integer size, Integer trainability, Integer intelligence, Integer mouthiness, Integer preyDrive, Integer bark, Integer wanderlust, Integer energy, Integer intensity, Integer exercise, Integer playfulness) {
        this.id = id;
        this.name = name;
        this.idDog = idDog;
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

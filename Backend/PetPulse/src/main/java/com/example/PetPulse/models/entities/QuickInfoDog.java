package com.example.PetPulse.models.entities;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "quick_info_dogs")
public class QuickInfoDog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "origin")
    private String origin;

    @Column(name = "size")
    private String size;

    @Column(name = "breed_group")
    private String breedGroup;

    @Column(name = "lifespan")
    private String lifespan;

    @Column(name = "coat")
    private String coat;

    @Column(name = "temperament")
    private String temperament;

    @Column(name = "exercise_needs")
    private String exerciseNeeds;

    @Column(name = "training_needs")
    private String trainingNeeds;

    @Column(name = "health_concerns")
    private String healthConcerns;

    @Column(name = "id_dog")
    private Integer idDog;

    public QuickInfoDog() {
    }

    public QuickInfoDog(Integer id, String origin, String size, String breedGroup, String lifespan, String coat, String temperament, String exerciseNeeds, String trainingNeeds, String healthConcerns, Integer idDog) {
        this.id = id;
        this.origin = origin;
        this.size = size;
        this.breedGroup = breedGroup;
        this.lifespan = lifespan;
        this.coat = coat;
        this.temperament = temperament;
        this.exerciseNeeds = exerciseNeeds;
        this.trainingNeeds = trainingNeeds;
        this.healthConcerns = healthConcerns;
        this.idDog = idDog;
    }
}

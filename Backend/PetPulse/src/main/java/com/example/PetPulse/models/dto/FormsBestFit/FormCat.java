package com.example.PetPulse.models.dto.FormsBestFit;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FormCat {
    private boolean apartmentLiving;
    private boolean otherPet;
    private boolean frequentTravels;
    private boolean freeTimeToAccord;
    private boolean kids;
    private int affection;
    private int playfulness;
    private boolean problemWithCatHair;
    private int intelligence;

    public FormCat(boolean apartmentLiving, boolean otherPet, boolean frequentTravels, boolean freeTimeToAccord, boolean kids, int affection, int playfulness, boolean problemWithCatHair, int intelligence) {
        this.apartmentLiving = apartmentLiving;
        this.otherPet = otherPet;
        this.frequentTravels = frequentTravels;
        this.freeTimeToAccord = freeTimeToAccord;
        this.kids = kids;
        this.affection = affection;
        this.playfulness = playfulness;
        this.problemWithCatHair = problemWithCatHair;
        this.intelligence = intelligence;
    }
}
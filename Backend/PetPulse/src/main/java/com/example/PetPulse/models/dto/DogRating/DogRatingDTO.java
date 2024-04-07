package com.example.PetPulse.models.dto.DogRating;

public class DogRatingDTO {
    private Integer idDog;
    private Integer apartmentLiving;
    private Integer sensibility;
    private Integer alone;
    private Integer affection;
    private Integer size;
    private Integer intelligence;
    private Integer playfulness;

    public DogRatingDTO() {
    }

    public Integer getIdDog() {
        return idDog;
    }

    public void setIdDog(Integer idDog) {
        this.idDog = idDog;
    }

    public Integer getApartmentLiving() {
        return apartmentLiving;
    }

    public void setApartmentLiving(Integer apartmentLiving) {
        this.apartmentLiving = apartmentLiving;
    }

    public Integer getSensibility() {
        return sensibility;
    }

    public void setSensibility(Integer sensibility) {
        this.sensibility = sensibility;
    }

    public Integer getAlone() {
        return alone;
    }

    public void setAlone(Integer alone) {
        this.alone = alone;
    }

    public Integer getAffection() {
        return affection;
    }

    public void setAffection(Integer affection) {
        this.affection = affection;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(Integer intelligence) {
        this.intelligence = intelligence;
    }

    public Integer getPlayfulness() {
        return playfulness;
    }

    public void setPlayfulness(Integer playfulness) {
        this.playfulness = playfulness;
    }

    public DogRatingDTO(Integer idDog, Integer apartmentLiving, Integer sensibility, Integer alone, Integer affection, Integer size, Integer intelligence, Integer playfulness) {
        this.idDog = idDog;
        this.apartmentLiving = apartmentLiving;
        this.sensibility = sensibility;
        this.alone = alone;
        this.affection = affection;
        this.size = size;
        this.intelligence = intelligence;
        this.playfulness = playfulness;
    }
}

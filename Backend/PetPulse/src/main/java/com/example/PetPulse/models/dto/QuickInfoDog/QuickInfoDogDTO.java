package com.example.PetPulse.models.dto.QuickInfoDog;

public class QuickInfoDogDTO {

    private Integer idDog;
    private String origin;
    private String size;
    private String lifespan;
    private String coat;

    public Integer getIdDog() {
        return idDog;
    }

    public void setIdDog(Integer idDog) {
        this.idDog = idDog;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getLifespan() {
        return lifespan;
    }

    public void setLifespan(String lifespan) {
        this.lifespan = lifespan;
    }

    public String getCoat() {
        return coat;
    }

    public void setCoat(String coat) {
        this.coat = coat;
    }

    public QuickInfoDogDTO(Integer idDog, String origin, String size, String lifespan, String coat) {
        this.idDog = idDog;
        this.origin = origin;
        this.size = size;
        this.lifespan = lifespan;
        this.coat = coat;
    }

    public QuickInfoDogDTO() {
    }
}

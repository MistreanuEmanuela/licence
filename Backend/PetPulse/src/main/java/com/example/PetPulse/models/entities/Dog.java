package com.example.PetPulse.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "dog_info")
public class Dog{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String general;
    private String overview;
    private String size;
    private String personality;
    private String health;
    private String feeding;
    private String coat;
    private String friendship;
    private String care;

    // Constructors, getters, and setters

    public Dog() {
    }

    public Dog(String name, String general, String overview, String size, String personality, String health, String feeding, String coat, String friendship, String care) {
        this.name = name;
        this.general = general;
        this.overview = overview;
        this.size = size;
        this.personality = personality;
        this.health = health;
        this.feeding = feeding;
        this.coat = coat;
        this.friendship = friendship;
        this.care = care;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGeneral() {
        return general;
    }

    public void setGeneral(String general) {
        this.general = general;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getPersonality() {
        return personality;
    }

    public void setPersonality(String personality) {
        this.personality = personality;
    }

    public String getHealth() {
        return health;
    }

    public void setHealth(String health) {
        this.health = health;
    }

    public String getFeeding() {
        return feeding;
    }

    public void setFeeding(String feeding) {
        this.feeding = feeding;
    }

    public String getCoat() {
        return coat;
    }

    public void setCoat(String coat) {
        this.coat = coat;
    }

    public String getFriendship() {
        return friendship;
    }

    public void setFriendship(String friendship) {
        this.friendship = friendship;
    }

    public String getCare() {
        return care;
    }

    public void setCare(String care) {
        this.care = care;
    }

}
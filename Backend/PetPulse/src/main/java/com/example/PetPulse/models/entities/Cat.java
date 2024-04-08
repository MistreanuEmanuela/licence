package com.example.PetPulse.models.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Setter
@Getter
@Table(name = "cat_info")
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String general;
    private String size;
    private String personality;
    private String health;
    private String coat;
    private String friendship;
    private String care;

    public Cat() {
    }

    public Cat(Long id, String name, String general, String size, String personality, String health, String coat, String friendship, String care) {
        this.id = id;
        this.name = name;
        this.general = general;
        this.size = size;
        this.personality = personality;
        this.health = health;
        this.coat = coat;
        this.friendship = friendship;
        this.care = care;
    }
}

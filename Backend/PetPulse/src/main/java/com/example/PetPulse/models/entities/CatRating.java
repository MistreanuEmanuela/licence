package com.example.PetPulse.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

@Entity
@Table(name = "cat_ratings")
public class CatRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "cat_id")
    private Integer idCat;


    @Column(name = "affection")
    private Integer affection;

    @Column(name = "shedding")
    private Integer shedding;

    @Column(name = "health")
    private Integer health;

    @Column(name = "playfulness")
    private Integer playfulness;

    @Column(name = "kid_friendly")
    private Integer kidFriendly;

    @Column(name = "vocalize")
    private Integer vocalize;

    @Column(name = "intelligence")
    private Integer intelligence;

    @Column(name = "groom")
    private Integer groom;

    @Column(name = "strangers")
    private Integer strangers;

    @Column(name = "pet_friendly")
    private Integer petFriendly;

    public CatRating() {
    }

    public CatRating(Integer id, Integer idCat, Integer affection, Integer shedding, Integer health, Integer playfulness, Integer kidFriendly, Integer vocalize, Integer intelligence, Integer groom, Integer strangers, Integer petFriendly) {
        this.id = id;
        this.idCat = idCat;
        this.affection = affection;
        this.shedding = shedding;
        this.health = health;
        this.playfulness = playfulness;
        this.kidFriendly = kidFriendly;
        this.vocalize = vocalize;
        this.intelligence = intelligence;
        this.groom = groom;
        this.strangers = strangers;
        this.petFriendly = petFriendly;
    }

    @Override
    public String toString() {
        return "CatRating{" +
                "id=" + id +
                ", idCat=" + idCat +
                ", affection=" + affection +
                ", shedding=" + shedding +
                ", health=" + health +
                ", playfulness=" + playfulness +
                ", kidFriendly=" + kidFriendly +
                ", vocalize=" + vocalize +
                ", intelligence=" + intelligence +
                ", groom=" + groom +
                ", strangers=" + strangers +
                ", petFriendly=" + petFriendly +
                '}';
    }
}

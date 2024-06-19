package com.example.PetPulse.models.dto.CatRatingDTO;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CatRatingsCompleteDTO {
    private Integer id;
    private String name;
    private Integer idCat;
    private Integer affection;
    private Integer sheeding;
    private Integer playfulness;
    private Integer kidFriendly;
    private Integer intelligence;
    private Integer petFriendly;
    private Integer groom;
    private Integer strangers;
    private Integer vocalize;
    private Integer health;

    public CatRatingsCompleteDTO() {
    }

    public CatRatingsCompleteDTO(Integer id, String name, Integer idCat, Integer affection, Integer sheeding, Integer playfulness,
               Integer kidFriendly, Integer intelligence, Integer petFriendly, Integer groom,
               Integer strangers, Integer vocalize, Integer health) {
        this.id = id;
        this.name = name;
        this.idCat = idCat;
        this.affection = affection;
        this.sheeding = sheeding;
        this.playfulness = playfulness;
        this.kidFriendly = kidFriendly;
        this.intelligence = intelligence;
        this.petFriendly = petFriendly;
        this.groom = groom;
        this.strangers = strangers;
        this.vocalize = vocalize;
        this.health = health;
    }
}

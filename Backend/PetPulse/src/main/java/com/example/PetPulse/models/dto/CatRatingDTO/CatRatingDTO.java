package com.example.PetPulse.models.dto.CatRatingDTO;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CatRatingDTO {
    private Integer id;
    private Integer affection;
    private Integer playfulness;
    private Integer kidFriendly;
    private Integer intelligence;
    private Integer petFriendly;
    private Integer groom;
    private Integer strangers;

    public CatRatingDTO() {
    }

    public CatRatingDTO(Integer id, Integer affection, Integer playfulness, Integer kidFriendly, Integer intelligence, Integer petFriendly, Integer groom, Integer strangers) {
        this.id = id;
        this.affection = affection;
        this.playfulness = playfulness;
        this.kidFriendly = kidFriendly;
        this.intelligence = intelligence;
        this.petFriendly = petFriendly;
        this.groom = groom;
        this.strangers = strangers;
    }
}

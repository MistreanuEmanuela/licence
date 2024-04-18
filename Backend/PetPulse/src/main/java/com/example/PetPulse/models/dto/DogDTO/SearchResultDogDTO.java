package com.example.PetPulse.models.dto.DogDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchResultDogDTO {
    private Long id;
    private String name;

    private String description;

    public SearchResultDogDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public SearchResultDogDTO() {
    }
}

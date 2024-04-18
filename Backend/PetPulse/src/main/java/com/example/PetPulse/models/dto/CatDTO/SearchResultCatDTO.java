package com.example.PetPulse.models.dto.CatDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchResultCatDTO {
    private Long id;
    private String name;

    private String description;

    public SearchResultCatDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public SearchResultCatDTO() {
    }
}


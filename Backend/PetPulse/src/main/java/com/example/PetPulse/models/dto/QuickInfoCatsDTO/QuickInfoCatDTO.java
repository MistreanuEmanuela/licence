package com.example.PetPulse.models.dto.QuickInfoCatsDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QuickInfoCatDTO {
    private Integer idCat;
    private String origin;
    private String size;
    private String lifespan;
    private String coat;
    private String temperament;

    public QuickInfoCatDTO() {
    }

    public QuickInfoCatDTO(Integer idCat, String origin, String size, String lifespan, String coat, String temperament) {
        this.idCat = idCat;
        this.origin = origin;
        this.size = size;
        this.lifespan = lifespan;
        this.coat = coat;
        this.temperament = temperament;
    }
}

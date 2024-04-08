package com.example.PetPulse.models.dto.CatDTO;

public class CatAllDTO {
    private Long id;
    private String name;

    public CatAllDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public CatAllDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

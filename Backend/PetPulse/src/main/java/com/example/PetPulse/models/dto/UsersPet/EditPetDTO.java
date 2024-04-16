package com.example.PetPulse.models.dto.UsersPet;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class EditPetDTO {
    private Long id;
    private String name;
    private String description;
    private Double weight;
    private String allergies;
    private Date birthdate;
    private String visibility;
    private String imagePath;

    public EditPetDTO() {
    }

    public EditPetDTO(Long id, String name, String description, Double weight, String allergies, Date age, String visibility, String imagePath) {
        this.name = name;
        this.description = description;
        this.weight = weight;
        this.allergies = allergies;
        this.birthdate = age;
        this.visibility = visibility;
        this.imagePath = imagePath;
        this.id = id;
    }


}

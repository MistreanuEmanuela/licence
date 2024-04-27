package com.example.PetPulse.models.dto.PostDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostCreateDTO {
    private String postName;
    private String postText;

    public PostCreateDTO() {
    }

    public PostCreateDTO(String postName, String postText) {
        this.postName = postName;
        this.postText = postText;
    }
}

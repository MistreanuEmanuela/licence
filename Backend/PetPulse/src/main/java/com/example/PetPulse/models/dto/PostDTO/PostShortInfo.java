package com.example.PetPulse.models.dto.PostDTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Setter
@Getter
public class PostShortInfo {
    private Long id;
    private String postText;
    private LocalDateTime createdAt;

    public PostShortInfo() {
    }

    public PostShortInfo(Long id, String postText, LocalDateTime createdAt) {
        this.id = id;
        this.postText = postText;
        this.createdAt = createdAt;
    }
}

package com.example.PetPulse.models.dto.PostDTO;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostLongInfo {
    private Long id;
    private String postName;
    private String postText;
    private LocalDateTime createdAt;

    private Long userId;

    public PostLongInfo(Long id, String postName, String postText, LocalDateTime createdAt, Long userId) {
        this.id = id;
        this.postName = postName;
        this.postText = postText;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}

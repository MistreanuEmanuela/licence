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
    private boolean isOwner;
    private String userFirstName;
    private String userLastName;

    public PostLongInfo(Long id, String postName, String postText, LocalDateTime createdAt, boolean isOwner) {
        this.id = id;
        this.postName = postName;
        this.postText = postText;
        this.createdAt = createdAt;
        this.isOwner = isOwner;
    }

    public PostLongInfo(Long id, String postName, String postText, LocalDateTime createdAt, boolean isOwner, String userFirstName, String userLastName) {
        this.id = id;
        this.postName = postName;
        this.postText = postText;
        this.createdAt = createdAt;
        this.isOwner = isOwner;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
    }

    public PostLongInfo() {

    }
}

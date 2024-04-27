package com.example.PetPulse.models.entities;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "user_id")
    private Long userId;

    @Column(name = "post_name")
    private String postName;

    @Column(name ="post_text")
    private String postText;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime createdAt;

    public Post(Long id, Long userId, String postName, String postText, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.postName = postName;
        this.postText = postText;
        this.createdAt = createdAt;
    }

    public Post() {
    }
}
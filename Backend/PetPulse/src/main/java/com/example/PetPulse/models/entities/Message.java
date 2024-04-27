package com.example.PetPulse.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Table(name = "messages")

public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "user_id")
    private Long userId;

    @Column(name = "post_id")
    private Long postId;

    @Column(name ="message_text")
    private String messageText;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime createdAt;

    public Message( Long userId, Long postId, String messageText, LocalDateTime createdAt) {
        this.userId = userId;
        this.postId = postId;
        this.messageText = messageText;
        this.createdAt = createdAt;
    }

    public Message() {
    }
}

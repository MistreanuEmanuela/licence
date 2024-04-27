package com.example.PetPulse.models.dto.PostDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AllMessagesInfoDTO {
    private Long id;
    private boolean owner;
    private Long postId;
    private String messageText;
    private LocalDateTime createdAt;

    private String FirstName;

    private String LastName;
}

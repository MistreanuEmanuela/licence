package com.example.PetPulse.models.dto.PostDTO;

public class MessagePostDTO {
    private Long postId;
    private String messageText;

    public Long getPostId() {
        return postId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public MessagePostDTO(Long postId, String messageText) {
        this.postId = postId;
        this.messageText = messageText;
    }

    public MessagePostDTO() {
    }
}

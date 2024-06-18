package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.PostDTO.AllMessagesInfoDTO;
import com.example.PetPulse.models.dto.PostDTO.MessagePostDTO;
import com.example.PetPulse.services.MessageServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MessageControllerTest {

    @Mock
    private MessageServiceImp messageServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private MessageController messageController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testUploadMessage() {
        MessagePostDTO messagePostDTO = new MessagePostDTO();
        when(authentication.getName()).thenReturn("testuser");
        messageController.uploadMessage(messagePostDTO, authentication);

        verify(messageServiceImp, times(1)).postMessage("testuser", messagePostDTO);
    }

    @Test
    public void testAllPost() {
        Long id = 1L;
        List<AllMessagesInfoDTO> messages = Collections.singletonList(new AllMessagesInfoDTO());

        when(authentication.getName()).thenReturn("testuser");

        when(messageServiceImp.getAll(id, "testuser")).thenReturn(messages);

        List<AllMessagesInfoDTO> result = messageController.allPost(id, authentication);

        assertEquals(messages, result);
    }

    @Test
    public void testDeleteMessage() {
        Long id = 1L;

        when(authentication.getName()).thenReturn("testuser");

        when(messageServiceImp.deleteMessage(id, "testuser")).thenReturn(true);

        ResponseEntity<String> responseEntity = messageController.deletePet(id, authentication);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Message deleted successfully", responseEntity.getBody());
    }
}

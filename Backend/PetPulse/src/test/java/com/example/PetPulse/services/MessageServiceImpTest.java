package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.PostDTO.AllMessagesInfoDTO;
import com.example.PetPulse.models.dto.PostDTO.MessagePostDTO;
import com.example.PetPulse.models.entities.Message;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.MessageRepository;
import com.example.PetPulse.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


class MessageServiceImpTest {
    @Mock
    private MessageRepository messageRepository;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private  MessageServiceImp messageServiceImp;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        MockitoAnnotations.openMocks(this); // Inițializare mock-urile

        String username = "testuser";
        Long userId = 1L;
        when(userRepository.findIdByUsername(username)).thenReturn(userId);
    }

    @Test
    void postMessage() {
        String username = "testuser";
        Long userId = 1L;
        when(userRepository.findIdByUsername(username)).thenReturn(userId);
        MessagePostDTO messagePostDTO = new MessagePostDTO();
        messagePostDTO.setMessageText("Hello, world!");
        messagePostDTO.setPostId(123L);

        assertDoesNotThrow(() -> {
            messageServiceImp.postMessage(username, messagePostDTO);
        });

        verify(messageRepository, times(1)).save(any());
    }

    @Test
    void getAll() {
        String username = "testUser";
        Long userId = 1L;

        when(userRepository.findIdByUsername(username)).thenReturn(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User(1L, "TEST", "TEST", "testUser")));
        List<Message> messages = new ArrayList<>();
        Message message1 = new Message(1L, 1L, "test", null);
        Message message2 = new Message(2L, 1L, "test2", null);
        messages.add(message1);
        messages.add(message2);
        when(messageRepository.findByUserId(1L)).thenReturn(messages);

        List<AllMessagesInfoDTO> messagesInfoDTOS = messageServiceImp.getAll(1L, username);

        assertNotNull(messagesInfoDTOS);
        assertEquals(1, messagesInfoDTOS.size());

    }

    @Test
    void deleteMessage() {
        Long messageId = 1L;
        String username = "testUser";
        Long userId = 1L;
        Message message = new Message(1L, 1L, "test", null);
        when(userRepository.findIdByUsername(username)).thenReturn(userId);
        when(messageRepository.findById(messageId)).thenReturn(Optional.of(message));

        boolean result = messageServiceImp.deleteMessage(messageId, username);

        assertTrue(result);
        verify(messageRepository, times(1)).deleteById(messageId);
    }
}
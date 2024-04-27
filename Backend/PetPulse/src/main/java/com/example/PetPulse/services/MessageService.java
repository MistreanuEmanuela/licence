package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.PostDTO.AllMessagesInfoDTO;
import com.example.PetPulse.models.dto.PostDTO.MessagePostDTO;

import java.util.List;

public interface MessageService {

    void postMessage(String username, MessagePostDTO messagePostDTO);

    List<AllMessagesInfoDTO> getAll(Long id, String username);

    boolean deleteMessage(Long id, String username);
}

package com.example.PetPulse.services;

import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.models.dto.PostDTO.AllMessagesInfoDTO;
import com.example.PetPulse.models.dto.PostDTO.MessagePostDTO;
import com.example.PetPulse.models.entities.Message;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.MessageRepository;
import com.example.PetPulse.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceImp implements MessageService{
    @Autowired
    UserRepository userRepository;

    private MessageRepository messageRepository;
    @Autowired

    public MessageServiceImp(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public void postMessage(String username, MessagePostDTO messagePostDTO) {
        if (messagePostDTO.getMessageText().equals("")) {
            throw new GeneralException("The message can t be empty");
        } else {
            Long id = userRepository.findIdByUsername(username);
            LocalDateTime time = LocalDateTime.now();
            Message message = new Message(id, messagePostDTO.getPostId(), messagePostDTO.getMessageText(), time);
            messageRepository.save(message);
        }
    }
    @Override
    public List<AllMessagesInfoDTO> getAll(Long id, String username) {
        List<Message> messages = messageRepository.findByUserId(id);
        List<AllMessagesInfoDTO> mess = messages.stream()
                .map(message -> {
                    User user = userRepository.findById(message.getUserId()).orElse(null);
                    Long userOwer = userRepository.findIdByUsername(username);
                    boolean owner = (userOwer.equals( message.getUserId()));
                    if (user != null) {
                        return new AllMessagesInfoDTO(
                               message.getId(),
                                owner,
                                message.getPostId(),
                                message.getMessageText(),
                                message.getCreatedAt(),
                                user.getFirstName(),
                                user.getLastName()
                        );
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return mess;
    }

    @Override
    public boolean deleteMessage(Long id, String username) {
        Long idUser = userRepository.findIdByUsername(username);
        Optional<Message> optionalMessage = messageRepository.findById(id);
        if (optionalMessage.isPresent()) {
        Message message = optionalMessage.get();
        if (!idUser.equals(message.getUserId())) {
                return false;
            } else {
                messageRepository.deleteById(id);
                return true;
            }
        }
        return false;
    }
}


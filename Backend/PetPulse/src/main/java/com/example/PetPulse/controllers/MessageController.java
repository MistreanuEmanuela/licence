package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.PostDTO.AllMessagesInfoDTO;
import com.example.PetPulse.models.dto.PostDTO.MessagePostDTO;
import com.example.PetPulse.models.dto.PostDTO.PostCreateDTO;
import com.example.PetPulse.models.dto.PostDTO.PostShortInfo;
import com.example.PetPulse.services.MessageService;
import com.example.PetPulse.services.MessageServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/messages")
public class MessageController {

    private MessageServiceImp messageServiceImp;

    @Autowired
    public MessageController(MessageServiceImp messageServiceImp) {
        this.messageServiceImp = messageServiceImp;
    }

    @PostMapping("/addMessage")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public void uploadMessage(@RequestBody MessagePostDTO mess, Authentication authentication) {
        String username = authentication.getName();
        messageServiceImp.postMessage(username, mess);
    }

    @GetMapping("/findMessages")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<AllMessagesInfoDTO> allPost(@RequestParam Long id, Authentication authentication) {
        return messageServiceImp.getAll(id, authentication.getName());
    }

    @DeleteMapping("/deleteMessage")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> deletePet(@RequestParam Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean deleted = messageServiceImp.deleteMessage(id, username);
        if (deleted) {
            return ResponseEntity.ok("Message deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message not found or you don't have permission to delete it");
        }
    }

}

package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.UsersDog.DogDTO;
import com.example.PetPulse.services.UserDogServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/pet")
@RestController
public class UsersDogController {


    private UserDogServiceImp petDogService;
    @Autowired
    public UsersDogController(UserDogServiceImp petDogService) {
        this.petDogService = petDogService;
    }




    @PostMapping("/dogs/upload")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> uploadDogPicture(@RequestPart MultipartFile file, Authentication authentication) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a file");
        }

        String username = authentication.getName();
        String imagePath;
        imagePath = petDogService.saveDogPicture(username, file);

        return ResponseEntity.ok(imagePath);
    }


    @PostMapping("/dogs/addDog")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public void uploadDogPicture(@RequestBody DogDTO dogDTO, Authentication authentication) {
        String username = authentication.getName();
        petDogService.saveDog(dogDTO, username);
    }
}
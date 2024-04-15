package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.services.UserPetServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/pet")
@RestController
public class UsersPetController {


    private UserPetServiceImp petService;
    @Autowired
    public UsersPetController(UserPetServiceImp petDogService) {
        this.petService = petDogService;
    }


    @PostMapping("/upload")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> uploadPicture(@RequestPart MultipartFile file, Authentication authentication) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload a file");
        }

        String username = authentication.getName();
        String imagePath;
        imagePath = petService.savePicture(username, file);

        return ResponseEntity.ok(imagePath);
    }


    @PostMapping("/addPet")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public void uploadAnimal(@RequestBody PetDTO petDTO, Authentication authentication) {
        String username = authentication.getName();
        petService.savePet(petDTO, username);
    }

    @GetMapping("/findMyPet")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<AllPetDTO> allMyPets(Authentication authentication) {
        String username = authentication.getName();
        return petService.findAllPet(username);
    }
    @GetMapping(path = "/picture")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<ByteArrayResource> getImage(@RequestParam String path) {
        try {
            String decodedPath = URLDecoder.decode(path, "UTF-8");
            String imagePath = decodedPath.replace("/", "\\");
            Path filePath = Paths.get(imagePath);
            byte[] imageBytes = Files.readAllBytes(filePath);
            ByteArrayResource resource = new ByteArrayResource(imageBytes);

            return ResponseEntity
                    .ok()
                    .contentLength(imageBytes.length)
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.DogDTO.SearchResultDogDTO;
import com.example.PetPulse.models.dto.UsersPet.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.EditPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.dto.UsersPet.SearchPetDTO;
import com.example.PetPulse.models.entities.UserPet;
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
import java.io.*;
import java.net.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

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

    @PostMapping("/findBreed")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> findBreed(@RequestPart MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a file");
        }
        try {
            Path tempFile = Files.createTempFile("temp", ".png");
            file.transferTo(tempFile.toFile());

//            ProcessBuilder pb = new ProcessBuilder("python", "D:\\licence-additionaly\\model-breed\\pythonProject1\\main.py", tempFile.toString());
            ProcessBuilder pb = new ProcessBuilder("python", "D:\\licence\\licence\\Additionally programs\\breedRecognition\\main.py", tempFile.toString());

            Process process = pb.start();
            process.waitFor();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String output = reader.lines().collect(Collectors.joining(System.lineSeparator()));

            return ResponseEntity.ok(output);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the image");
        }

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

    @GetMapping("/findNumberOfPets")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public Long allNumberOfPets(Authentication authentication) {
        String username = authentication.getName();
        return petService.findNumberOfPets(username);
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

    @PutMapping(path = "/editPet")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> editPet(@RequestBody EditPetDTO pet) {
        petService.editPet(pet);
        return ResponseEntity.ok("Pet information updated successfully");
    }

    @GetMapping(path="view")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public UserPet findPet(@RequestParam Long id)
    {
        return petService.findPet(id);
    }

    @DeleteMapping("/deletePet")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> deletePet(@RequestParam Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean deleted = petService.deletePet(id, username);
        if (deleted) {
            return ResponseEntity.ok("Pet deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found or you don't have permission to delete it");
        }
    }

    @GetMapping(path = "/all-pets-searched", params = "name")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<List<SearchPetDTO>> getAllPetsSearched(@RequestParam String name, Authentication authentication) {
        String username = authentication.getName();
        List<SearchPetDTO> pets = petService.searchPets(name, username);
        if (pets.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pets);
    }
}
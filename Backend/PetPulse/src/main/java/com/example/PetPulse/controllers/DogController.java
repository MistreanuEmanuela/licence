package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.dto.DogDTO.SearchResultDogDTO;
import com.example.PetPulse.models.entities.Dog;
import com.example.PetPulse.services.DogServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/dog")
public class DogController {
    private final DogServiceImp dogService;

    @Autowired
    public DogController(DogServiceImp dogService) {
        this.dogService = dogService;
    }

    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public Dog getDog(@PathVariable Long id) {
        return dogService.getDog(id);
    }
    @GetMapping(path = "picture/{name}", produces = org.springframework.http.MediaType.IMAGE_PNG_VALUE)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<byte[]> getDogPicture(@PathVariable String name) {
        byte[] pictureBytes = dogService.getDogPicture(name);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(pictureBytes, headers, HttpStatus.OK);
    }
    @GetMapping(path = "/alldogs")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<DogAllDTO> getAllDogs() {
        return dogService.getAllDogs();
    }

    @GetMapping(path = "/alldogsbysize", params = "size")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<DogAllDTO> getAllDogsBySize(@RequestParam String size) {
        return dogService.getAllDogsBySize(size);
    }

    @GetMapping(path = "/alldogsbylifespan", params = "lifespan")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<DogAllDTO> getAllDogsByLifespan(@RequestParam String lifespan) {
        return dogService.getAllDogsByLifespan(lifespan);
    }

    @GetMapping(path = "/alldogsbycoattype", params = "coat")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<DogAllDTO> getAllDogsByCoat(@RequestParam String coat) {
        return dogService.getAllDogsByCoat(coat);
    }

    @GetMapping(path = "/alldogsbycoatcolor", params = "color")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<DogAllDTO> getAllDogsByCoatColor(@RequestParam String color) {
        return dogService.getAllDogsByColor(color);
    }

    @GetMapping(path = "/alldogsbyname", params = "letter")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<DogAllDTO> getAllDogsByStartName(@RequestParam String letter) {
        return dogService.getAllDogsByFirstLetter(letter);
    }

    @GetMapping(path = "/all-dogs-searched", params = "name")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<List<SearchResultDogDTO>> getAllDogsSearched(@RequestParam String name) {
        List<SearchResultDogDTO> dogs = dogService.getDogsSearched(name);
        if (dogs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dogs);
    }
}
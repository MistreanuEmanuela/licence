package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.CatDTO.CatAllDTO;
import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.entities.Cat;
import com.example.PetPulse.services.CatServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/cat")
public class CatController {
    private final CatServiceImp catService;
    @Autowired
    public CatController(CatServiceImp catService) {
        this.catService = catService;
    }

    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public Cat getCat(@PathVariable Long id) {
        return catService.getCat(id);
    }
    @GetMapping(path = "picture/{name}", produces = org.springframework.http.MediaType.IMAGE_PNG_VALUE)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<byte[]> getCatPicture(@PathVariable String name) {
        byte[] pictureBytes = catService.getCatPicture(name);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(pictureBytes, headers, HttpStatus.OK);
    }
    @GetMapping(path = "/allcats")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<CatAllDTO> getAllCats() {
        return catService.getAllCats();
    }

    @GetMapping(path = "/allcatsbysize", params = "size")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<CatAllDTO> getAllCatsBySize(@RequestParam String size) {
        return catService.getAllCatsBySize(size);
    }

    @GetMapping(path = "/allcatsbylifespan", params = "lifespan")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<CatAllDTO> getAllCatsByLifespan(@RequestParam String lifespan) {
        return catService.getAllCatsByLifespan(lifespan);
    }

    @GetMapping(path = "/allcatsbycoattype", params = "coat")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<CatAllDTO> getAllCatsByCoat(@RequestParam String coat) {
        return catService.getAllCatsByCoat(coat);
    }

    @GetMapping(path = "/allcatsbycoatcolor", params = "color")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<CatAllDTO> getAllCatsByCoatColor(@RequestParam String color) {
        return catService.getAllCatsByColor(color);
    }

    @GetMapping(path = "/allcatsbyname", params = "letter")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<CatAllDTO> getAllCatsByStartName(@RequestParam String letter) {
        return catService.getAllCatsByFirstLetter(letter);
    }
}


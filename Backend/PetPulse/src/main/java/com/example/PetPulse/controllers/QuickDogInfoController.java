package com.example.PetPulse.controllers;
import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.services.DogInfoServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/dogQuickInfo")
public class QuickDogInfoController {
    private final DogInfoServiceImp dogInfoService;

    @Autowired
    public QuickDogInfoController(DogInfoServiceImp dogInfoService) {
        this.dogInfoService = dogInfoService;
    }

    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<QuickInfoDogDTO> getDogInfo(@PathVariable Long id) {
        Optional<QuickInfoDogDTO> infoOptional = dogInfoService.getDogInfo(id);
        if (infoOptional.isPresent()) {
            return ResponseEntity.ok(infoOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

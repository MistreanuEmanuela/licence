package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.DogRating.DogRatingsCompleteDTO;
import com.example.PetPulse.models.dto.DogRating.DogRatingDTO;
import com.example.PetPulse.models.dto.FormsBestFit.DogFormDTO;
import com.example.PetPulse.services.DogRatingServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/starRating")
public class StarRatingDogController {
    private final DogRatingServiceImp dogRatingServiceImp;

    @Autowired
    public StarRatingDogController(DogRatingServiceImp dogRatingServiceImp)
    {
        this.dogRatingServiceImp = dogRatingServiceImp;
    }

    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public DogRatingDTO getDogStar(@PathVariable Long id) {
        return dogRatingServiceImp.getDogRating(id);
    }


    @PostMapping("/findBestFit")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public DogRatingsCompleteDTO getBest(@RequestBody DogFormDTO form) {
        return dogRatingServiceImp.getBestFit(form);
    }
}

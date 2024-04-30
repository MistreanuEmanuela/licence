package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.dto.FormsBestFit.FormCat;
import com.example.PetPulse.models.entities.CatRating;
import com.example.PetPulse.services.CatRatingServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/starRatingCat")
public class StarRatingCatController {
    private final CatRatingServiceImp catRatingService;

    @Autowired

    public StarRatingCatController(CatRatingServiceImp catRatingService) {
        this.catRatingService = catRatingService;
    }
    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public CatRatingDTO getDogStar(@PathVariable Long id) {
        return catRatingService.getCatRating(id);
    }

    @PostMapping("/findBestFit")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public CatRating getBest(@RequestBody FormCat form) {
        return catRatingService.getBestFit(form);
    }
}

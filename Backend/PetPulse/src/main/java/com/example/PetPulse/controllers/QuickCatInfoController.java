package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;
import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.services.CatInfoServiceImp;
import com.example.PetPulse.services.CatRatingService;
import com.example.PetPulse.services.CatRatingServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/catQuickInfo")
public class QuickCatInfoController {

    private final CatInfoServiceImp catInfoService;

    @Autowired
    public QuickCatInfoController(CatInfoServiceImp catInfoService) {
        this.catInfoService = catInfoService;
    }

    @GetMapping("/{id}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public QuickInfoCatDTO getCatInfo(@PathVariable Long id) {
        return catInfoService.getCatInfo(id);
    }
}

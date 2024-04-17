package com.example.PetPulse.controllers;

import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.services.MedicalRecordServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/medicalRecord")
public class MedicalRecordController {
    private final MedicalRecordServiceImp medicalRecordServiceImp;

    public MedicalRecordController(MedicalRecordServiceImp medicalRecordServiceImp) {
        this.medicalRecordServiceImp = medicalRecordServiceImp;
    }


    @PostMapping("/addMedicalHistory")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public void uploadMedicalHistory(@RequestBody MedicalRecord medicalRecord, Authentication authentication) {
        String username = authentication.getName();
        medicalRecordServiceImp.saveMedicalRecord(medicalRecord, username);
    }
}

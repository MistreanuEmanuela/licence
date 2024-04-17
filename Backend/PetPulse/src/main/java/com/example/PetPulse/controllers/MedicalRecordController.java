package com.example.PetPulse.controllers;

import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.services.MedicalRecordServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/medical-records/{petId}")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<List<MedicalRecord>> getMedicalRecords(@PathVariable Long petId, Authentication authentication) {
        String username = authentication.getName();
        try {
            List<MedicalRecord> medicalRecords = medicalRecordServiceImp.findMedicalRecords(petId, username);
            return ResponseEntity.ok(medicalRecords);
        } catch (GeneralException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/deleteMedicalRecord")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> deletePet(@RequestParam Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean deleted = medicalRecordServiceImp.delete(id, username);
        if (deleted) {
            return ResponseEntity.ok("Medical record deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Medical record not found or you don't have permission to delete it");
        }
    }
}


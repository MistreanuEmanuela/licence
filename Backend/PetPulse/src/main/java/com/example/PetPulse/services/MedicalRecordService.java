package com.example.PetPulse.services;

import com.example.PetPulse.models.entities.MedicalRecord;

public interface MedicalRecordService {
    void saveMedicalRecord(MedicalRecord medicalRecord, String username);
}

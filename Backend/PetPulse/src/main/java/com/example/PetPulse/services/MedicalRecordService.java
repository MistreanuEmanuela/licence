package com.example.PetPulse.services;

import com.example.PetPulse.models.entities.MedicalRecord;

import java.util.List;
import java.util.Optional;

public interface MedicalRecordService {
    void saveMedicalRecord(MedicalRecord medicalRecord, String username);

    List<MedicalRecord> findMedicalRecords(Long id, String username);
    boolean delete(Long id, String username);
    Optional<MedicalRecord> findById(Long id, String username);

}

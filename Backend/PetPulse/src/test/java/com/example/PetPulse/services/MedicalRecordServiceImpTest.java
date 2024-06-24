package com.example.PetPulse.services;

import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.repositories.MedicalRecordRepository;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersPetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MedicalRecordServiceImpTest {

    @Mock
    private MedicalRecordRepository medicalRecordRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UsersPetRepository usersPetRepository;

    @InjectMocks
    private MedicalRecordServiceImp medicalRecordService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveMedicalRecord() {
        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setDosage(10);
        medicalRecord.setRepetitions(3);
        medicalRecord.setCosts(100.0);
        medicalRecord.setDuration(7);
        medicalRecord.setMonitoringDays(2);
        medicalRecord.setTreatmentDuration(14);
        medicalRecord.setDoctor("Dr");
        medicalRecord.setCombat("details");
        medicalRecord.setRegimen("Regimen");
        medicalRecord.setTreatmentNeed("Treatment");
        medicalRecord.setAdverseReactions("No");
        medicalRecord.setDate(new Date(System.currentTimeMillis()));
        medicalRecord.setIdPet(1L);

        String username = "test";

        when(userRepository.findIdByUsername(username)).thenReturn(1L);
        when(usersPetRepository.findOwnerId(medicalRecord.getIdPet())).thenReturn(1L);

        assertDoesNotThrow(() -> medicalRecordService.saveMedicalRecord(medicalRecord, username));
        verify(medicalRecordRepository, times(1)).save(medicalRecord);
    }


    @Test
    void findMedicalRecords() {
        Long petId = 1L;
        String username = "testuser";

        when(userRepository.findIdByUsername(username)).thenReturn(1L);
        when(usersPetRepository.findOwnerId(petId)).thenReturn(1L);
        when(medicalRecordRepository.findByIdPet(petId)).thenReturn(new ArrayList<>());

        List<MedicalRecord> medicalRecords = medicalRecordService.findMedicalRecords(petId, username);
        assertNotNull(medicalRecords);
    }

    @Test
    void delete() {
        Long medicalRecordId = 1L;
        String username = "testuser";

        when(userRepository.findIdByUsername(username)).thenReturn(1L);
        when(usersPetRepository.findOwnerId(any())).thenReturn(1L);
        when(medicalRecordRepository.findById(medicalRecordId)).thenReturn(Optional.of(new MedicalRecord()));

        boolean result = medicalRecordService.delete(medicalRecordId, username);
        assertTrue(result);
        verify(medicalRecordRepository, times(1)).deleteById(medicalRecordId);
    }

    @Test
    void findById() {
        Long medicalRecordId = 1L;
        String username = "testuser";

        when(userRepository.findIdByUsername(username)).thenReturn(1L);
        when(usersPetRepository.findOwnerId(any())).thenReturn(1L);
        when(medicalRecordRepository.findById(medicalRecordId)).thenReturn(Optional.of(new MedicalRecord()));

        Optional<MedicalRecord> medicalRecordOptional = medicalRecordService.findById(medicalRecordId, username);
        assertTrue(medicalRecordOptional.isPresent());
    }

}
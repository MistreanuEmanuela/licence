package com.example.PetPulse.services;

import com.example.PetPulse.Exception.Pet.PetNotFoundException;
import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.repositories.MedicalRecordRepository;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersPetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.regex.Pattern;
import java.time.LocalDate;


@Service
public class MedicalRecordServiceImp implements  MedicalRecordService{
    private final MedicalRecordRepository medicalRecordRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    UsersPetRepository usersPetRepository;

    public MedicalRecordServiceImp(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    @Override
    public void saveMedicalRecord(MedicalRecord medicalRecord, String username) {
        if (medicalRecord.getDosage() < 0 || medicalRecord.getRepetitions() < 0 ||
                medicalRecord.getCosts() < 0 || medicalRecord.getDuration() < 0 ||
                medicalRecord.getMonitoringDays() < 0 || medicalRecord.getTreatmentDuration() < 0) {
            throw new IllegalArgumentException("Numeric values must be greater than or equal to 0");
        }

        if (
                Pattern.compile("[0-9]").matcher(medicalRecord.getDoctor()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getCombat()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getRegimen()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getTreatmentNeed()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getAdverseReactions()).find()) {
            throw new IllegalArgumentException("Names cannot contain numbers");
        }

        Date currentDate = new Date(System.currentTimeMillis());
        if (medicalRecord.getDate() != null && medicalRecord.getDate().after(currentDate)) {
            throw new IllegalArgumentException("Date cannot be after today");
        }


        Long id = userRepository.findIdByUsername(username);
        Long id_user = usersPetRepository.findOwnerId(medicalRecord.getIdPet());
        if (id != id_user){
            System.out.println(id);
            System.out.println(id_user);
            throw new PetNotFoundException("The pet with provided id doesn't exist or you don't have permission to add");
        }

        medicalRecordRepository.save(medicalRecord);
    }
}

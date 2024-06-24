package com.example.PetPulse.services;

import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.Exception.Pet.PetNotFoundException;
import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.repositories.MedicalRecordRepository;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.repositories.UsersPetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;


@Service
public class MedicalRecordServiceImp implements  MedicalRecordService{
//    private final MedicalRecordRepository medicalRecordRepository;
    private  MedicalRecordRepository medicalRecordRepository;

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
            throw new GeneralException("Numeric values must be greater than or equal to 0");
        }

        if (
                Pattern.compile("[0-9]").matcher(medicalRecord.getDoctor()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getCombat()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getRegimen()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getTreatmentNeed()).find() ||
                Pattern.compile("[0-9]").matcher(medicalRecord.getAdverseReactions()).find()) {
            throw new GeneralException("Names cannot contain numbers");
        }

        Date currentDate = new Date(System.currentTimeMillis());
        if (medicalRecord.getDate() != null && medicalRecord.getDate().after(currentDate)) {
            throw new IllegalArgumentException("Date cannot be after today");
        }


        Long id = userRepository.findIdByUsername(username);
        Long id_user = usersPetRepository.findOwnerId(medicalRecord.getIdPet());
        if (id != id_user){
            throw new PetNotFoundException("The pet with provided id doesn't exist or you don't have permission to add");
        }

        medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public List<MedicalRecord> findMedicalRecords(Long id, String username) {
        Long id_usr = userRepository.findIdByUsername(username);
        Long id_user = usersPetRepository.findOwnerId(id);
        if (id_usr != id_user){
            throw new GeneralException("The pet with provided id doesn't exist or you don't have permission to this information");
        }
        return medicalRecordRepository.findByIdPet(id);
    }

    @Override
    public boolean delete(Long id, String username) {
        Long id_usr = userRepository.findIdByUsername(username);
        Long id_user = usersPetRepository.findOwnerId(medicalRecordRepository.findPetId(id));
        if (id_usr != id_user){
            throw new GeneralException("The pet with provided id doesn't exist or you don't have permission to this information");
        }
        Optional<MedicalRecord> medical = medicalRecordRepository.findById(id);
        if (medical != null) {
           medicalRecordRepository.deleteById(id);
            return true;
        }
        else {
            return false;
        }

    }

    @Override
    public Optional<MedicalRecord> findById(Long id, String username) {
        Long id_usr = userRepository.findIdByUsername(username);
        Long id_user = usersPetRepository.findOwnerId(medicalRecordRepository.findPetId(id));
        if (id_usr != id_user) {
            throw new GeneralException("The pet with provided id doesn't exist or you don't have permission to this information");
        }
        Optional<MedicalRecord> medical = medicalRecordRepository.findById(id);
        if (medical != null) {
            return medical;
        }
        else {
            return Optional.empty();
        }
    }
}

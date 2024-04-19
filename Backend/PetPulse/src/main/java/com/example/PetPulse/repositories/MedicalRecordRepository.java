package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    @Query(value = "SELECT * FROM medical_records WHERE id_pet = :id order by date",nativeQuery = true)
    List<MedicalRecord> findByIdPet(@Param("id") long id);

    @Query(value = "SELECT id_pet FROM medical_records WHERE id = :id",nativeQuery = true)
    Long findPetId(@Param("id") long id);
}

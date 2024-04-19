package com.example.PetPulse.repositories;

import com.example.PetPulse.models.dto.QuickInfoDog.QuickInfoDogDTO;
import com.example.PetPulse.models.entities.QuickInfoDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface QuickInfoDogRepository extends JpaRepository<QuickInfoDog,Long> {

    @Query(value = "SELECT * FROM quick_info_dogs WHERE id_dog = :idDog", nativeQuery = true)
    Optional<QuickInfoDog> findInfoById(Long idDog);
}
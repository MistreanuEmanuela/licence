package com.example.PetPulse.repositories;

import com.example.PetPulse.models.dto.DogDTO.DogAllDTO;
import com.example.PetPulse.models.entities.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DogRepository extends JpaRepository<Dog,Long> {
    @Query(value = "SELECT * FROM dog_info order by name", nativeQuery = true)
    List<Dog> findAllDogs();
    @Query(value = "SELECT * FROM dog_info WHERE id = :id",nativeQuery = true)
    Dog findById(@Param("id") long id);
}

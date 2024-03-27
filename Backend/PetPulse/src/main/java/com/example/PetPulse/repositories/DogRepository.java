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

    @Query(value = "SELECT dog_info.id as id, dog_info.name as name, dog_info.general as general, " +
            "dog_info.overview as overview, dog_info.size as size, dog_info.personality as personality, " +
            "dog_info.health as health, dog_info.feeding as feeding, dog_info.coat as coat, " +
            "dog_info.friendship as friendship, dog_info.care as care " +
            "FROM dog_info " +
            "JOIN quick_info_dogs ON dog_info.id = quick_info_dogs.id_dog " +
            "WHERE lower(quick_info_dogs.size) LIKE %:size% " +
            "ORDER BY dog_info.name", nativeQuery = true)
    List<Dog> findAllDogsBySize(@Param("size") String size);
    @Query(value = "SELECT * FROM dog_info WHERE id = :id",nativeQuery = true)
    Dog findById(@Param("id") long id);
}

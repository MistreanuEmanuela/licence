package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.DogRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DogRatingRepository extends JpaRepository<DogRating,Long> {
    @Query(value = "SELECT * FROM dog_ratings WHERE id_dog = :idDog", nativeQuery = true)
    DogRating findInfoById(Long idDog);
}

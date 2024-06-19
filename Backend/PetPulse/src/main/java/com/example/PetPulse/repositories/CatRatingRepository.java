package com.example.PetPulse.repositories;

import com.example.PetPulse.models.dto.CatRatingDTO.CatRatingDTO;
import com.example.PetPulse.models.entities.CatRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CatRatingRepository extends JpaRepository<CatRating,Long> {

    @Query(value = "SELECT * FROM cat_ratings WHERE cat_id = :idCat", nativeQuery = true)
    CatRating findInfoById(Long idCat);
}

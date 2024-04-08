package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.QuickInfoCat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuickInfoCatRepository extends JpaRepository<QuickInfoCat,Long> {

    @Query(value = "SELECT * FROM quick_info_cats WHERE id_cat = :idCat", nativeQuery = true)
    QuickInfoCat findInfoById(Long idCat);
}

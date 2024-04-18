package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CatRepository extends JpaRepository<Cat,Long> {
    @Query(value = "SELECT * FROM cat_info order by name", nativeQuery = true)
    List<Cat> findAllCats();
    @Query(value = "SELECT * FROM cat_info WHERE id = :id",nativeQuery = true)
    Cat findById(@Param("id") long id);

    @Query(value = "SELECT * FROM cat_info WHERE LOWER(name) LIKE LOWER(concat('%', :name, '%'))", nativeQuery = true)
    List<Cat> findByName(@Param("name") String name);
    @Query(value = "SELECT cat_info.id as id, cat_info.name as name, cat_info.general as general, " +
            "cat_info.size as size, cat_info.personality as personality, " +
            "cat_info.health as health, cat_info.coat as coat, " +
            "cat_info.friendship as friendship, cat_info.care as care " +
            "FROM cat_info " +
            "JOIN quick_info_cats ON cat_info.id = quick_info_cats.id_cat " +
            "WHERE lower(quick_info_cats.size) LIKE %:size% " +
            "ORDER BY cat_info.name", nativeQuery = true)
    List<Cat> findAllCatsBySize(@Param("size") String size);

    @Query(value = "SELECT cat_info.id as id, cat_info.name as name, cat_info.general as general, " +
            "cat_info.size as size, cat_info.personality as personality, " +
            "cat_info.health as health, cat_info.coat as coat, " +
            "cat_info.friendship as friendship, cat_info.care as care " +
            "FROM cat_info " +
            "JOIN quick_info_cats ON cat_info.id = quick_info_cats.id_cat " +
            "WHERE lower(quick_info_cats.lifespan) LIKE %:lifespan% " +
            "ORDER BY cat_info.name", nativeQuery = true)
    List<Cat> findAllCatsByLifespan(@Param("lifespan") String lifespan);

    @Query(value = "SELECT cat_info.id as id, cat_info.name as name, cat_info.general as general, " +
            "cat_info.size as size, cat_info.personality as personality, " +
            "cat_info.health as health, cat_info.coat as coat, " +
            "cat_info.friendship as friendship, cat_info.care as care " +
            "FROM cat_info " +
            "JOIN quick_info_cats ON cat_info.id = quick_info_cats.id_cat " +
            "WHERE lower(quick_info_cats.coat) LIKE %:coat% " +
            "ORDER BY cat_info.name", nativeQuery = true)
    List<Cat> findAllCatsByCoatType(@Param("coat") String coat);

    @Query(value = "SELECT * FROM cat_info WHERE lower(coat) LIKE %:color%", nativeQuery = true)
    List<Cat> findCatsByCoatColor(@Param("color") String color);

    @Query(value = "SELECT * FROM cat_info WHERE lower(name) LIKE :letter%", nativeQuery = true)
    List<Cat> findCatsByNameStartingWithLetter(@Param("letter") String letter);
}

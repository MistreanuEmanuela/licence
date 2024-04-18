package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.Dog;
import com.example.PetPulse.models.entities.UserPet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersPetRepository extends JpaRepository<UserPet,Long> {
    @Query(value = "SELECT * FROM users_pet WHERE user_id = :id", nativeQuery = true)
    List<UserPet> findAllPet(@Param("id") Long id);

    @Query(value = "SELECT * FROM users_pet WHERE id = :id", nativeQuery = true)
    UserPet findUserPetById(@Param("id") Long id);

    @Query(value = "SELECT user_id FROM users_pet WHERE id = :id", nativeQuery = true)
    Long findOwnerId(@Param("id") Long id);

    @Query(value = "SELECT * FROM users_pet WHERE LOWER(breed) LIKE LOWER(concat('%', :breed, '%')) AND user_id != :idUser AND visibility = 'public'", nativeQuery = true)
    List<UserPet> findByName(@Param("breed") String breed, @Param("idUser") Long idUser);
}

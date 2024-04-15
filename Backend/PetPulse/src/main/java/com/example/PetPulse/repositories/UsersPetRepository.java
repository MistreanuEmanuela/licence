package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.UserPet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersPetRepository extends JpaRepository<UserPet,Long> {

}

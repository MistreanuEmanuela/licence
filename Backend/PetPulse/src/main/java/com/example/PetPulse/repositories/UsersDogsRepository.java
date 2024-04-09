package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.UserDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersDogsRepository extends JpaRepository<UserDog,Long> {

}

package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.models.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query(value = "SELECT * FROM messages WHERE post_id = :id order by created_at",nativeQuery = true)
    List<Message> findByUserId(@Param("id") Long id);
}

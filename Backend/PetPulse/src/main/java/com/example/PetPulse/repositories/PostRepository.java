package com.example.PetPulse.repositories;

import com.example.PetPulse.models.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT * FROM posts order by created_at", nativeQuery = true)
    List<Post> findAll();

}

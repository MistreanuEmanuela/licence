package com.example.PetPulse.repositories;
import com.example.PetPulse.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT * FROM USERS WHERE id = :id",nativeQuery = true)
    User findById(@Param("id") long id);

    @Query(value = "SELECT * FROM USERS WHERE email = :email",nativeQuery = true)
    User findByEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM USERS WHERE username = :username",nativeQuery = true)
    User findByUsername(@Param("username") String username);
}

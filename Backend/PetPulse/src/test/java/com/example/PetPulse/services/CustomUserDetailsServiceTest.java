package com.example.PetPulse.services;

import com.example.PetPulse.models.entities.Role;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService userDetailsService;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        roles = new HashSet<>();
        roles.add(new Role(1L,"user"));
        user = new User();
        user.setUsername("test");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRoles(roles);
    }
    private User user;
    private Set<Role> roles;
    @Test
    void loadUserByUsername() {
        when(userRepository.findByUsernameOrEmail("test")).thenReturn(Optional.of(user));

        UserDetails userDetails = userDetailsService.loadUserByUsername("test");

        assertEquals("test", userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().contains(new SimpleGrantedAuthority("user")));
    }
    @Test
    void loadUserByUsername_NotFound() {
        when(userRepository.findByUsernameOrEmail("test")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("test");
        });
    }
}
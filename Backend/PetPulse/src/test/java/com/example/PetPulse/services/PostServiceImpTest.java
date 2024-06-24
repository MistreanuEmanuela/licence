package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.PostDTO.MessagePostDTO;
import com.example.PetPulse.models.dto.PostDTO.PostCreateDTO;
import com.example.PetPulse.models.dto.PostDTO.PostLongInfo;
import com.example.PetPulse.models.dto.PostDTO.PostShortInfo;
import com.example.PetPulse.models.entities.Message;
import com.example.PetPulse.models.entities.Post;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.PostRepository;
import com.example.PetPulse.repositories.UserRepository;
import jdk.dynalink.linker.LinkerServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceImpTest {
    @Mock
    private PostRepository postRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PostServiceImp postServiceImp;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        MockitoAnnotations.openMocks(this);

        String username = "testuser";
        Long userId = 1L;
        when(userRepository.findIdByUsername(username)).thenReturn(userId);
    }

    @Test
    void createPost() {
        String username = "testuser";
        Long userId = 1L;
        when(userRepository.findIdByUsername(username)).thenReturn(userId);
        PostCreateDTO post = new PostCreateDTO("ceva", "Ceva");

        assertDoesNotThrow(() -> {
            postServiceImp.createPost(post, username);
        });

        verify(postRepository, times(1)).save(any());
    }

    @Test
    void deletePost() {
        Long postId = 1L;
        String username = "testUser";
        Long userId = 1L;
        Post post = new Post(1L,1L, "test", "test", null);
        when(userRepository.findIdByUsername(username)).thenReturn(userId);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        boolean result = postServiceImp.deletePost(postId, username);

        assertTrue(result);
        verify(postRepository, times(1)).deleteById(postId);
    }

    @Test
    void getAll() {
        List<Post> post = new ArrayList<>();
        Post post1 = new Post(1L, 1L, "CEVA", "ceva", null);
        Post post2 = new Post(2L, 1L, "CEVA", "ceva", null);
        post.add(post1);
        post.add(post2);
        when(postRepository.findAll()).thenReturn(post);
        List<PostShortInfo> postResult = postServiceImp.getAll();
        assertNotNull(postResult);
        assertEquals(2, postResult.size());
    }

}
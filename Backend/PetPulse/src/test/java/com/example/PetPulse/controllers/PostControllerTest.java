package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.PostDTO.PostCreateDTO;
import com.example.PetPulse.models.dto.PostDTO.PostLongInfo;
import com.example.PetPulse.models.dto.PostDTO.PostShortInfo;
import com.example.PetPulse.services.PostServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class PostControllerTest {

    @Mock
    private PostServiceImp postServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private PostController postController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    void testUploadPost() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        PostCreateDTO postCreateDTO = new PostCreateDTO();
        when(authentication.getName()).thenReturn("user1");
        postController.uploadPost(postCreateDTO, authentication);
        verify(postServiceImp, times(1)).createPost(any(PostCreateDTO.class), eq("user1"));
    }

    @Test
    void testAllPost() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        PostShortInfo post1 = new PostShortInfo(1L, "Post text 1", null);
        PostShortInfo post2 = new PostShortInfo(2L, "Post text 2", null);
        List<PostShortInfo> posts = Arrays.asList(post1, post2);
        when(postServiceImp.getAll()).thenReturn(posts);

        List<PostShortInfo> result = postController.allPost(authentication);

        assertEquals(2, result.size());
        verify(postServiceImp, times(1)).getAll();
    }

    @Test
    void testPost() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        PostLongInfo postLongInfo = new PostLongInfo(1L, "Post title", "Post text", null, true, "User", "Name");
        when(authentication.getName()).thenReturn("user1");
        when(postServiceImp.getPost(anyLong(), eq("user1"))).thenReturn(postLongInfo);

        PostLongInfo result = postController.post(1L, authentication);

        assertEquals(postLongInfo, result);
        verify(postServiceImp, times(1)).getPost(1L, "user1");
    }

    @Test
    void testDeletePost() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(authentication.getName()).thenReturn("user1");
        when(postServiceImp.deletePost(anyLong(), eq("user1"))).thenReturn(true);

        ResponseEntity<String> response = postController.deletePet(1L, authentication);

        assertEquals("Post deleted successfully", response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(postServiceImp, times(1)).deletePost(1L, "user1");
    }

    @Test
    void testDeletePostNotFound() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(authentication.getName()).thenReturn("user1");
        when(postServiceImp.deletePost(anyLong(), eq("user1"))).thenReturn(false);

        ResponseEntity<String> response = postController.deletePet(1L, authentication);

        assertEquals("Post not found or you don't have permission to delete it", response.getBody());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(postServiceImp, times(1)).deletePost(1L, "user1");
    }
}

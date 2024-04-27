package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.PostDTO.PostCreateDTO;
import com.example.PetPulse.models.dto.PostDTO.PostLongInfo;
import com.example.PetPulse.models.dto.PostDTO.PostShortInfo;

import java.util.List;

public interface PostService {

    void createPost(PostCreateDTO post, String username);

    boolean deletePost(Long IdPost, String username);

    List<PostShortInfo> getAll();

    PostLongInfo getPost(Long id, String username);
}

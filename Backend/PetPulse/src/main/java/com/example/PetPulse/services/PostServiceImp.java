package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.PostDTO.PostCreateDTO;
import com.example.PetPulse.models.dto.PostDTO.PostLongInfo;
import com.example.PetPulse.models.dto.PostDTO.PostShortInfo;
import com.example.PetPulse.models.entities.Post;
import com.example.PetPulse.repositories.PostRepository;
import com.example.PetPulse.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImp implements  PostService {
    @Autowired
    UserRepository userRepository;

    private PostRepository postRepository;

    @Autowired
    public PostServiceImp(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void createPost(PostCreateDTO post, String username) {
        Long id = userRepository.findIdByUsername(username);
        Post newPost = new Post();
        newPost.setPostName(post.getPostName());
        newPost.setPostText(post.getPostText());
        newPost.setUserId(id);
        LocalDateTime time = LocalDateTime.now();
        newPost.setCreatedAt(time);
        try {
            postRepository.save(newPost);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean deletePost(Long idPost, String username) {
        Long id = userRepository.findIdByUsername(username);
        Optional<Post> optionalPost = postRepository.findById(idPost);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            if (!id.equals(post.getUserId())) {
                return false;
            } else {
                postRepository.deleteById(idPost);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<PostShortInfo> getAll() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(post -> new PostShortInfo(post.getId(), post.getPostName(), post.getCreatedAt()))
                .collect(Collectors.toList());
    }


    @Override
    public PostLongInfo getPost(Long id) {
        Optional<Post> postOptional = postRepository.findById(id);
        if (!postOptional.isPresent()) {
            return null;
        } else {
            Post post = postOptional.get();
            return new PostLongInfo(post.getId(), post.getPostName(), post.getPostText(), post.getCreatedAt(), post.getUserId());
        }

    }
}

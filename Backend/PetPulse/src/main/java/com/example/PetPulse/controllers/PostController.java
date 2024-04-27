package com.example.PetPulse.controllers;

import com.example.PetPulse.models.dto.PostDTO.PostCreateDTO;
import com.example.PetPulse.models.dto.PostDTO.PostLongInfo;
import com.example.PetPulse.models.dto.PostDTO.PostShortInfo;
import com.example.PetPulse.models.dto.UsersPet.AllPetDTO;
import com.example.PetPulse.models.dto.UsersPet.PetDTO;
import com.example.PetPulse.models.entities.UserPet;
import com.example.PetPulse.services.PostService;
import com.example.PetPulse.services.PostServiceImp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/posts")
public class PostController {

    private final PostServiceImp postServiceImp;

    @Autowired
    public PostController(PostServiceImp postServiceImp) {
        this.postServiceImp = postServiceImp;
    }

    @PostMapping("/addPost")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public void uploadPost(@RequestBody PostCreateDTO post, Authentication authentication) {
        String username = authentication.getName();
        postServiceImp.createPost(post, username);
    }

    @GetMapping("/findPosts")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public List<PostShortInfo> allPost(Authentication authentication) {
        return postServiceImp.getAll();
    }

    @GetMapping("/findPost")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public PostLongInfo post(@RequestParam Long id,Authentication authentication ) {
        String username = authentication.getName();
        return postServiceImp.getPost(id, username);
    }

    @DeleteMapping("/deletePost")
    @Operation(security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<String> deletePet(@RequestParam Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean deleted = postServiceImp.deletePost(id, username);
        if (deleted) {
            return ResponseEntity.ok("Post deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found or you don't have permission to delete it");
        }
    }
}

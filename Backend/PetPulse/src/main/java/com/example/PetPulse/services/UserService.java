package com.example.PetPulse.services;

import com.example.PetPulse.Exception.User.EmailAlreadyExistsException;
import com.example.PetPulse.Exception.User.PasswordValidationException;
import com.example.PetPulse.Exception.User.UsernameAlreadyExistsException;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.UserRepository;
import com.example.PetPulse.models.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userDao) {
        this.userRepository = userDao;

    }

    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) !=null) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if (userRepository.findByUsername(user.getUsername())!= null) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

        if (!isValidPassword(user.getPassword())) {
            throw new PasswordValidationException("Invalid password");
        }
        return userRepository.save(user);
    }
    public boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        return pattern.matcher(password).matches();
    }
}


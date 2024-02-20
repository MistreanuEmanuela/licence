package com.example.PetPulse.services;
import com.example.PetPulse.Advice.EmailTokenProvider;
import com.example.PetPulse.Exception.User.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
import java.util.regex.Pattern;


@Service
public class UserServiceImp implements UserService{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    public UserServiceImp(UserRepository userDao, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userDao;

        this.passwordEncoder = passwordEncoder;
    }
@Override
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
        String encodedPassword = encodePassword(user.getPassword());
        user.setPassword(encodedPassword);
        sendConfirmationEmail(user);
        return userRepository.save(user);
    }
    @Override
    public boolean login(String username, String password){
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException("Username not found");
        }
        else
        {
            if(!matchesPassword(password, user.getPassword())){
                throw new IncorrectPasswordException("The password is not correct");
            }
            else{
                if (user.isActivated() == false){
                    throw new AccountNotActivatedException("You account has not been activated, you should check you e-mail");
                }
            }
        }
        return true;
    }

    @Override
    public boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        return pattern.matcher(password).matches();
    }
    @Override
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
    @Override
    public boolean matchesPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    @Override
    public void sendConfirmationEmail(User user) {
        String token = EmailTokenProvider.generateToken(user.getEmail());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Account Confirmation");
        message.setText("Please click the following link to confirm your account: http://localhost/users/confirm?token=" + token);
//        mailSender.send(message);
    }
    @Override
    public boolean confirmUserAccount(String token) {
        if (EmailTokenProvider.validateToken(token)) {
            String email = EmailTokenProvider.getEmailFromToken(token);
            userRepository.activate(email);
            return true;
        }
        else{
                throw new IncorrectLinkException("Link is not correct");
            }
    }
}


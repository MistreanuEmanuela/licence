package com.example.PetPulse.services;
import com.example.PetPulse.Advice.EmailTokenProvider;
import com.example.PetPulse.Advice.ForgotPasswordToken;
import com.example.PetPulse.Advice.JwtTokenProvider;
import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.Exception.User.*;
import com.example.PetPulse.models.dto.UsersDto.ChangeProfilePasswordDTO;
import com.example.PetPulse.models.dto.UsersDto.ProfileUserDTO;
import com.example.PetPulse.models.dto.UsersDto.UserDto;
import com.example.PetPulse.models.dto.UsersDto.UserEditDTO;
import com.example.PetPulse.models.entities.Role;
import com.example.PetPulse.repositories.RoleRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.PetPulse.models.entities.User;
import com.example.PetPulse.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.regex.Pattern;


@Service
public class UserServiceImp implements UserService{

    private UserRepository userRepository;
    private RoleRepository roleRepository;
//    private final BCryptPasswordEncoder passwordEncoder;
    private BCryptPasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    @Autowired
    private ForgotPasswordToken forgotPasswordToken;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserServiceImp(UserRepository userDao, BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, RoleRepository role) {
        this.userRepository = userDao;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = role;
    }
@Override
    public User createUser(UserDto user) {
        if (userRepository.findByEmail(user.getEmail()) !=null) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if (userRepository.findByUsername(user.getUsername())!= null) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

        if (!isValidPassword(user.getPassword())) {
            throw new PasswordValidationException("Invalid password");
        }
        if (!isValidBirthdate(user.getBirthdate())) {
            throw new GeneralException("Invalid birthdate");
        }

        if (!isValidName(user.getFirstName()) || !isValidName(user.getLastName())) {
            throw new GeneralException("Invalid name");
        }
        String encodedPassword = encodePassword(user.getPassword());
        user.setPassword(encodedPassword);
        Role role = roleRepository.findByName("user");
        User newUser = new User(user.getFirstName(), user.getLastName(), user.getEmail(),
                encodedPassword,user.getBirthdate(), user.getUsername() );
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        newUser.setRoles(roles);
        sendConfirmationEmail(newUser);
        return userRepository.save(newUser);

    }
    @Override
    public String login(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UserNotFoundException("Username not found");
        } else {
            if (!matchesPassword(password, user.getPassword())) {
                throw new IncorrectPasswordException("The password is not correct");
            } else {
                if (!user.isActivated()) {
                    throw new AccountNotActivatedException("Your account has not been activated, you should check your e-mail");
                }
            }
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                username,
                password
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
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

    private boolean isValidBirthdate(Date birthdate) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.YEAR, -10);
        Date tenYearsAgo = cal.getTime();
        return birthdate.before(tenYearsAgo);
    }

    private boolean isValidName(String name) {
        return name.matches("^[a-zA-Z]+$");
    }
    @Override
    public void sendConfirmationEmail(User user)  {
        String token = EmailTokenProvider.generateToken(user.getEmail());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Account Confirmation");
        message.setText("Please click the following link to confirm your account: http://localhost:8082/users/confirm?token=" + token);
        mailSender.send(message);
    }
    @Override
    public boolean confirmUserAccount(String token) {
        if (EmailTokenProvider.validateToken(token)) {
            String email = EmailTokenProvider.getEmailFromToken(token);
            User user = userRepository.findByEmail(email);
            if(user != null)
            {
                user.setActivated(true);
                userRepository.save(user);
            }
            return true;
        }
        else{
                throw new IncorrectLinkException("Link is not correct");
            }
    }
    @Override
    public void validatePasswordCode(String code, String email){
        if (forgotPasswordToken.validateToken(email,code) == false)
        {
            throw new IncorrectCodeException("The code is not correct");
        }
    }
    @Override
    public void changePassword(String email, String newPassword){
        if (!isValidPassword(newPassword)) {
            throw new PasswordValidationException("Invalid password");
        }
        String encodedPassword = encodePassword(newPassword);
        User user = userRepository.findByEmail(email);
        if(user == null)
        {
            throw new UserNotFoundException("This email is not valid");
        }
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }
    @Override
    public void forgotPassword(String email){
        User user = userRepository.findByEmail(email);
        if (user == null)
        {
            throw new EmailNotFoundException("The email introduced is not associated with any account");
        }
        String token = forgotPasswordToken.generateToken(email);
        sendPasswordResetEmail(email, token);
    }
    @Override
    public void sendPasswordResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("PasswordChange");
        message.setText("The code for resetting password is: " + token);
        mailSender.send(message);
    }

    @Override
    public ProfileUserDTO findUserProfile(String username) {
        User user = userRepository.findByUsername(username);
        ProfileUserDTO profile = new ProfileUserDTO(user.getLastName(), user.getFirstName(),user.getEmail(), user.getBirthDate(), user.getUsername());
        return profile;
    }

    @Override
    public boolean changeProfilePassword(ChangeProfilePasswordDTO changePassword, String username) {
        User user = userRepository.findByUsername(username);
        if (matchesPassword(changePassword.getCurrentPassword(), user.getPassword())) {
            if (!isValidPassword(changePassword.getNewPassword())) {
                throw new PasswordValidationException("Invalid password");
            }
            String encodedPassword = encodePassword(changePassword.getNewPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean changeProfileInformation(UserEditDTO userEditDTO, String username) {
        User user = userRepository.findByUsername(username);
        if (!isValidBirthdate(userEditDTO.getBirthdate())) {
            throw new GeneralException("Invalid birthdate");
        }

        if (!isValidName(userEditDTO.getFirstName()) || !isValidName(userEditDTO.getLastName())) {
            throw new GeneralException("Invalid name");
        }
        user.setLastName(userEditDTO.getLastName());
        user.setFirstName(userEditDTO.getFirstName());
        user.setBirthDate(userEditDTO.getBirthdate());
        userRepository.save(user);
        return true;
    }
}


package com.example.PetPulse.Advice;

import com.example.PetPulse.Exception.User.EmailAlreadyExistsException;
import com.example.PetPulse.Exception.User.PasswordValidationException;
import com.example.PetPulse.Exception.User.UsernameAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@ControllerAdvice

public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<String> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<String> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PasswordValidationException.class)
    public ResponseEntity<String> handlePasswordValidationException(PasswordValidationException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}

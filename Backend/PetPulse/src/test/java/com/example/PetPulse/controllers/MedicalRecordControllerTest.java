package com.example.PetPulse.controllers;

import com.example.PetPulse.Exception.General.GeneralException;
import com.example.PetPulse.models.entities.MedicalRecord;
import com.example.PetPulse.services.MedicalRecordServiceImp;
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

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MedicalRecordControllerTest {

    @Mock
    private MedicalRecordServiceImp medicalRecordServiceImp;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private MedicalRecordController medicalRecordController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testUploadMedicalHistory() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        MedicalRecord medicalRecord = new MedicalRecord();

        when(authentication.getName()).thenReturn("testuser");

        medicalRecordController.uploadMedicalHistory(medicalRecord, authentication);

        verify(medicalRecordServiceImp, times(1)).saveMedicalRecord(medicalRecord, "testuser");
    }

    @Test
    public void testGetMedicalRecords() throws GeneralException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Long petId = 1L;
        List<MedicalRecord> medicalRecords = Collections.singletonList(new MedicalRecord());

        when(authentication.getName()).thenReturn("testuser");

        when(medicalRecordServiceImp.findMedicalRecords(petId, "testuser")).thenReturn(medicalRecords);

        ResponseEntity<List<MedicalRecord>> responseEntity = medicalRecordController.getMedicalRecords(petId, authentication);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(medicalRecords, responseEntity.getBody());
    }

    @Test
    public void testDeleteMedicalRecord() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Long id = 1L;

        when(authentication.getName()).thenReturn("testuser");

        when(medicalRecordServiceImp.delete(id, "testuser")).thenReturn(true);

        ResponseEntity<String> responseEntity = medicalRecordController.deletePet(id, authentication);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Medical record deleted successfully", responseEntity.getBody());
    }

    @Test
    public void testGetMedicalRecord() throws GeneralException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Long id = 1L;
        MedicalRecord medicalRecord = new MedicalRecord();

        when(authentication.getName()).thenReturn("testuser");

        when(medicalRecordServiceImp.findById(id, "testuser")).thenReturn(Optional.of(medicalRecord));

        ResponseEntity<Object> responseEntity = medicalRecordController.getMedicalRecord(id, authentication);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(Optional.of(medicalRecord), responseEntity.getBody());
    }
}

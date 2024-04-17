package com.example.PetPulse.models.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@Table(name = "medical_records")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "id_pet")
    private Long idPet;

    @Column(name = "type")
    private String type;

    @Column(name = "date")
    private Date date;

    @Column(name = "cabinet")
    private String cabinet;

    @Column(name = "doctor")
    private String doctor;

    @Column(name = "symptoms")
    private String symptoms;

    @Column(name = "diagnostic")
    private String diagnostic;

    @Column(name = "treatment")
    private String treatment;

    @Column(name = "treatmenttype")
    private String treatmentType;

    @Column(name = "treatmentduration")
    private int treatmentDuration;

    @Column(name = "treatmentlocation")
    private String treatmentLocation;

    @Column(name = "administrationfrequency")
    private String administrationFrequency;

    @Column(name = "dosage")
    private double dosage;

    @Column(name = "repetitions")
    private int repetitions;

    @Column(name = "combat")
    private String combat;

    @Column(name = "animalcondition")
    private String animalCondition;

    @Column(name = "costs")
    private double costs;

    @Column(name = "interventiontype")
    private String interventionType;

    @Column(name = "duration")
    private int duration;

    @Column(name = "monitoringdays")
    private int monitoringDays;

    @Column(name = "regimen")
    private String regimen;

    @Column(name = "additionalinfos")
    private String additionalInfos;

    @Column(name = "treatmentneed")
    private String treatmentNeed;

    @Column(name = "adversereactions")
    private String adverseReactions;

    public MedicalRecord() {
    }

    public MedicalRecord(Long idPet, String type, Date date, String cabinet, String doctor, String symptoms, String diagnostic, String treatment, String treatmentType, int treatmentDuration, String treatmentLocation, String administrationFrequency, double dosage, int repetitions, String combat, String animalCondition, double costs, String interventionType, int duration, int monitoringDays, String regimen, String additionalInfos, String treatmentNeed, String adverseReactions) {
        this.idPet = idPet;
        this.type = type;
        this.date = date;
        this.cabinet = cabinet;
        this.doctor = doctor;
        this.symptoms = symptoms;
        this.diagnostic = diagnostic;
        this.treatment = treatment;
        this.treatmentType = treatmentType;
        this.treatmentDuration = treatmentDuration;
        this.treatmentLocation = treatmentLocation;
        this.administrationFrequency = administrationFrequency;
        this.dosage = dosage;
        this.repetitions = repetitions;
        this.combat = combat;
        this.animalCondition = animalCondition;
        this.costs = costs;
        this.interventionType = interventionType;
        this.duration = duration;
        this.monitoringDays = monitoringDays;
        this.regimen = regimen;
        this.additionalInfos = additionalInfos;
        this.treatmentNeed = treatmentNeed;
        this.adverseReactions = adverseReactions;
    }
}

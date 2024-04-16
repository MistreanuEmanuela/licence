import React, { useEffect, useState } from 'react';
import styles from './medicalHistory.module.css';
import Navbar from '../NavBars/NavBar';

interface MedicalHistory {
    type: string;
    date: string;
    cabinet: string;
    doctor: string;
    symptoms: string;
    diagnostic: string;
    treatment: string;
    treatmentType: string;
    treatmentDuration: number;
    treatmentLocation: string;
    administrationFrequency: string;
    dosage: number;
    repetitions: number;
    combat: string;
    animalCondition: string;
    costs: number;
    interventionType: string;
    duration: number;
    monitoringDays: number;
    regimen: string;
    additionalInfos: string;
    treatmentNeed: string;
    adverseReactions: string;
}

const Consultation: React.FC = () => {
    const [medical, setMedical] = useState<MedicalHistory>({
        type: '',
        date: '',
        cabinet: '',
        doctor: '',
        symptoms: '',
        diagnostic: '',
        treatment: '',
        treatmentType: '',
        treatmentDuration: 0,
        treatmentLocation: '',
        administrationFrequency: '',
        dosage: 0,
        repetitions: 0,
        combat: '',
        animalCondition: '',
        costs: 0,
        interventionType: '',
        duration: 0,
        monitoringDays: 0,
        regimen: '',
        additionalInfos: '',
        treatmentNeed: '',
        adverseReactions: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMedical(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form className={styles.formular}>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <input className={styles.input} type="date" id="date" name="date" value={medical.date} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <input className={styles.input} type="text" id="cabinet" name="cabinet" placeholder="Enter the cabinet name" value={medical.cabinet} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <input className={styles.input} placeholder="Enter doctor's name" type="text" id="doctor" name="doctor" value={medical.doctor} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="type">Consultation Type:</label>
                    <select className={styles.input} id="type" name="type" value={medical.type} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="checkup">Checkup</option>
                        <option value="urgent">Urgent</option>
                        <option value="onDemand">On Demand</option>
                    </select>
                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="symptoms">Symptoms:</label>
                <textarea className={styles.input} id="symptoms" name="symptoms" value={medical.symptoms} placeholder="Enter the animal symptoms" onChange={handleChange} />
            </div>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label htmlFor="diagnostic">Diagnostic:</label>
                    <input className={styles.input} type="text" id="diagnostic" name="diagnostic" value={medical.diagnostic} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="treatmentNeed">Treatment Prescribed:</label>
                    <select className={styles.input} id="treatmentNeed" name="treatmentNeed" value={medical.treatmentNeed} onChange={handleChange}>
                        <option value="">Select ...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.save}> Save</button>
            </div>
        </form>
    );
}

const Treatment: React.FC = () => {
    const [medical, setMedical] = useState<MedicalHistory>({
        type: '',
        date: '',
        cabinet: '',
        doctor: '',
        symptoms: '',
        diagnostic: '',
        treatment: '',
        treatmentType: '',
        treatmentDuration: 0,
        treatmentLocation: '',
        administrationFrequency: '',
        dosage: 0,
        repetitions: 0,
        combat: '',
        animalCondition: '',
        costs: 0,
        interventionType: '',
        duration: 0,
        monitoringDays: 0,
        regimen: '',
        additionalInfos: '',
        treatmentNeed: '',
        adverseReactions: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMedical(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form className={styles.formular}>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <input className={styles.input} type="date" id="date" name="date" value={medical.date} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <input className={styles.input} type="text" id="cabinet" name="cabinet" placeholder="Enter the cabinet name" value={medical.cabinet} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <input className={styles.input} placeholder="Enter doctor's name" type="text" id="doctor" name="doctor" value={medical.doctor} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="treatmentLocation">Place of Treatment:</label>
                    <select className={styles.input} id="treatmentLocation" name="treatmentLocation" value={medical.treatmentLocation} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="home">Home</option>
                        <option value="hospital">Hospital</option>
                    </select>
                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="additionalInfos">Additional Information:</label>
                <textarea className={styles.input} id="additionalInfos" name="additionalInfos" value={medical.additionalInfos} placeholder="Enter relevant information about this treatment" onChange={handleChange} />
            </div>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label htmlFor="treatment">Treatment Name:</label>
                    <input className={styles.input} type="text" placeholder="Name" id="treatment" name="treatment" value={medical.treatment} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="treatmentType">Treatment Type:</label>
                    <select className={styles.input} id="treatmentType" name="treatmentType" value={medical.treatmentType} onChange={handleChange}>
                        <option value="">Select ...</option>
                        <option value="vaccine">Vaccine</option>
                        <option value="infusion">Infusion</option>
                        <option value="drug">Drug</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="dosage">Dosage:</label>
                    <input className={styles.input} type="number" placeholder="Dosage" id="dosage" name="dosage" value={medical.dosage} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="administrationFrequency">Administration Frequency:</label>
                    <input className={styles.input} type="text" placeholder="Frequency" id="administrationFrequency" name="administrationFrequency" value={medical.administrationFrequency} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.save}> Save</button>
            </div>
        </form>
    );
}

const Vaccine: React.FC = () => {
    const [medical, setMedical] = useState<MedicalHistory>({
        type: '',
        date: '',
        cabinet: '',
        doctor: '',
        symptoms: '',
        diagnostic: '',
        treatment: '',
        treatmentType: '',
        treatmentDuration: 0,
        treatmentLocation: '',
        administrationFrequency: '',
        dosage: 0,
        repetitions: 0,
        combat: '',
        animalCondition: '',
        costs: 0,
        interventionType: '',
        duration: 0,
        monitoringDays: 0,
        regimen: '',
        additionalInfos: '',
        treatmentNeed: '',
        adverseReactions: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMedical(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form className={styles.formular}>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <input className={styles.input} type="date" id="date" name="date" value={medical.date} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <input className={styles.input} type="text" id="cabinet" name="cabinet" placeholder="Enter the cabinet name" value={medical.cabinet} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <input className={styles.input} placeholder="Enter doctor's name" type="text" id="doctor" name="doctor" value={medical.doctor} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="adverseReactions">Adverse Reactions:</label>
                    <select className={styles.input} id="adverseReactions" name="adverseReactions" value={medical.adverseReactions} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="additionalInfos">Additional Information:</label>
                <textarea className={styles.input} id="additionalInfos" name="additionalInfos" value={medical.additionalInfos} placeholder="Enter relevant information" onChange={handleChange} />
            </div>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label htmlFor="dosage">Administration Dose:</label>
                    <input className={styles.input} type="number" id="dosage" name="dosage" value={medical.dosage} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="repetitions">Number of Repetitions:</label>
                    <input className={styles.input} type="number" id="repetitions" name="repetitions" value={medical.repetitions} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.save}> Save</button>
            </div>
        </form>
    );
}

const Intervention: React.FC = () => {
    const [medical, setMedical] = useState<MedicalHistory>({
        type: '',
        date: '',
        cabinet: '',
        doctor: '',
        symptoms: '',
        diagnostic: '',
        treatment: '',
        treatmentType: '',
        treatmentDuration: 0,
        treatmentLocation: '',
        administrationFrequency: '',
        dosage: 0,
        repetitions: 0,
        combat: '',
        animalCondition: '',
        costs: 0,
        interventionType: '',
        duration: 0,
        monitoringDays: 0,
        regimen: '',
        additionalInfos: '',
        treatmentNeed: '',
        adverseReactions: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMedical(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form className={styles.formular}>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <input className={styles.input} type="date" id="date" name="date" value={medical.date} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <input className={styles.input} type="text" id="cabinet" name="cabinet" placeholder="Enter the cabinet name" value={medical.cabinet} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <input className={styles.input} placeholder="Enter doctor's name" type="text" id="doctor" name="doctor" value={medical.doctor} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="interventionType">Intervention Type:</label>
                    <select className={styles.input} id="interventionType" name="interventionType" value={medical.interventionType} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="sterilization">Sterilization</option>
                        <option value="castration">Castration</option>
                        <option value="surgicalIntervention">Surgical Intervention</option>
                    </select>
                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="animalCondition">Animal Condition:</label>
                <textarea className={styles.input} id="animalCondition" name="animalCondition" value={medical.animalCondition} placeholder="Enter relevant information " onChange={handleChange} />
            </div>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label htmlFor="costs">Costs:</label>
                    <input className={styles.input} type="number" id="costs" name="costs" value={medical.costs} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="duration">Intervention Duration:</label>
                    <input className={styles.input} type="number" id="duration" name="duration" value={medical.duration} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="monitoringDays">Monitoring Days:</label>
                    <input className={styles.input} type="number" id="monitoringDays" name="monitoringDays" value={medical.monitoringDays} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="regimen">Regimen Necessity:</label>
                    <select className={styles.input} id="regimen" name="regimen" value={medical.regimen} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.save}> Save</button>
            </div>
        </form>
    );
}

const AddMedicalHistory: React.FC = () => {
    const [type, setType] = useState<string>();

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    return (
        <div className={styles.body}>
            <Navbar pagename="" />
            <div className={styles.options}>
                <p>Select what type of medical record you want to add:</p>
                <select value={type} onChange={handleTypeChange} className={styles.select_option}>
                    <option value="">Select...</option>
                    <option value="consultation">Consultation</option>
                    <option value="treatment">Treatment</option>
                    <option value="vaccine">Vaccine</option>
                    <option value="intervention">Intervention</option>
                </select>
            </div>
            {type === 'consultation' && <Consultation />}
            {type === 'treatment' && <Treatment />}
            {type === 'vaccine' && <Vaccine/>}
            {type === 'intervention' && <Intervention/>}
        </div>
    );
}

export default AddMedicalHistory;

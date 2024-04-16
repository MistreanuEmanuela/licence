import React, { useEffect, useState } from 'react';
import styles from './medicalHistory.module.css';
import Navbar from '../NavBars/NavBar';

interface MedicalHistory {
    type: string;
    date: string;
    cabinet: string;
    doctor: string;
    simptoms: string;
    diagnostic: string;
    tratament: string;
    tratamentType: string;
    durataTratament: number;
    locatieTratament: string;
    frecventaAdministrate: string;
    dozaAdministrare: number;
    nrRepetari: number;
    combatere: string;
    stareAnimal: string;
    costuri: number;
    tipInterventie: string;
    durata: number;
    nrZileSupravegere: number;
    regim: string;
    additionalInfos: string;
    tratamentNeed: string,
}

const Consultation: React.FC = () => {
    const [medical, setMedical] = useState<MedicalHistory>({
        type: '',
        date: '',
        cabinet: '',
        doctor: '',
        simptoms: '',
        diagnostic: '',
        tratament: '',
        tratamentType: '',
        durataTratament: 0,
        locatieTratament: '',
        frecventaAdministrate: '',
        dozaAdministrare: 0,
        nrRepetari: 0,
        combatere: '',
        stareAnimal: '',
        costuri: 0,
        tipInterventie: '',
        durata: 0,
        nrZileSupravegere: 0,
        regim: '',
        additionalInfos: '',
        tratamentNeed: '',
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
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <input className={styles.input} type="date" id="date" name="date" value={medical.date} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <input className={styles.input} type="text" id="cabinet" name="cabinet" placeholder="Enter the cabinet name" value={medical.cabinet} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <input className={styles.input} placeholder="Enter doc name" type="text" id="doctor" name="doctor" value={medical.doctor} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="type">Consultation Type:</label>
                    <select className={styles.input} id="type" name="type" value={medical.type} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="checkup">Checkup</option>
                        <option value="urgent">Urgent</option>
                        <option value="onDemand">On Demand</option>
                    </select>
                </div>
            </div>
            <div className={styles.fild_long}>
                <label htmlFor="simptoms">Symptoms:</label>
                <textarea className={styles.input} id="simptoms" name="simptoms" value={medical.simptoms} placeholder="Enter the animal symptoms" onChange={handleChange} />
            </div>
            <div className={styles.first_part}>
                <div className={styles.fild}>
                    <label htmlFor="diagnostic">Diagnostic:</label>
                    <input className={styles.input} type="text" id="diagnostic" name="diagnostic" value={medical.diagnostic} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label htmlFor="tratamentNeed">Treatment Prescribed:</label>
                    <select className={styles.input} id="tratamentNeed" name="tratamentNeed" value={medical.tratamentNeed} onChange={handleChange}>
                        <option value="">Select ...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.save}> Save</button></div>
        </form>
    );
}
const Tratament: React.FC = () => {
    const [medical, setMedical] = useState<MedicalHistory>({
        type: '',
        date: '',
        cabinet: '',
        doctor: '',
        simptoms: '',
        diagnostic: '',
        tratament: '',
        tratamentType: '',
        durataTratament: 0,
        locatieTratament: '',
        frecventaAdministrate: '',
        dozaAdministrare: 0,
        nrRepetari: 0,
        combatere: '',
        stareAnimal: '',
        costuri: 0,
        tipInterventie: '',
        durata: 0,
        nrZileSupravegere: 0,
        regim: '',
        additionalInfos: '',
        tratamentNeed: '',
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
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <input className={styles.input} type="date" id="date" name="date" value={medical.date} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <input className={styles.input} type="text" id="cabinet" name="cabinet" placeholder="Enter the cabinet name" value={medical.cabinet} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <input className={styles.input} placeholder="Enter doc name" type="text" id="doctor" name="doctor" value={medical.doctor} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label className={styles.label} htmlFor="place">Place of treatment:</label>
                    <select className={styles.input} id="place" name="locatieTratament" value={medical.locatieTratament} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="home">Home</option>
                        <option value="hospital">Hospital</option>
                    </select>
                </div>
            </div>
            <div className={styles.fild_long}>
                <label htmlFor="additionalInfos">  Additional information:</label>
                <textarea className={styles.input} id="additionalInfos" name="additionalInfos" value={medical.additionalInfos} placeholder="Enter relevant information about this tratament" onChange={handleChange} />
            </div>
            <div className={styles.first_part}>
                <div className={styles.fild}>
                    <label htmlFor="tratament">Tratament name:</label>
                    <input className={styles.input} type="text" placeholder="name" id="tratament" name="tratament" value={medical.tratament} onChange={handleChange} />
                </div>
                <div className={styles.fild}>
                    <label htmlFor="tratamentType">Treatment type:</label>
                    <select className={styles.input} id="tratamentType" name="tratamentType" value={medical.tratamentType} onChange={handleChange}>
                        <option value="">Select ...</option>
                        <option value="vaccine">vaccine</option>
                        <option value="infusion">infusion</option>
                        <option value="drug">drug</option>
                    </select>
                </div>


                <div className={styles.fild}>
                    <label htmlFor="doza">Dose :</label>
                    <input className={styles.input} type="number" placeholder="doza" id="dozaAdministrare" name="dozaAdministrare" value={medical.dozaAdministrare} onChange={handleChange} />
                </div>

                <div className={styles.fild}>
                    <label htmlFor="frecventa">Frecvency :</label>
                    <input className={styles.input} type="text" placeholder="frecvency" id="frecventaAdministrate" name="frecventaAdministrate" value={medical.frecventaAdministrate} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.button_container}>
                <button className={styles.save}> Save</button></div>
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
                    <option value="tratament">Tratament</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>
            {type === 'consultation' && <Consultation />}
            {type === 'tratament' && <Tratament />}
        </div>
    )
}

export default AddMedicalHistory;

import React, { useEffect, useState } from 'react';
import styles from './medical.module.css';
import Navbar from '../NavBars/NavBar';

interface MedicalHistory {
    id: number;
    idPet: number;
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

const Treatment: React.FC<{ medical: MedicalHistory }> = ({ medical }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };

    return (
        <div className={styles.content}>
            <h3> Treatment information</h3>


            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <div className={styles.input} > {formatDate(medical.date)} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <div className={styles.input} > {medical.cabinet} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <div className={styles.input} > {medical.doctor} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="treatmentLocation">Place of Treatment:</label>
                    <div className={styles.input} > {medical.treatmentLocation} </div>

                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="additionalInfos">Additional Information:</label>
                <div className={styles.input} > {medical.additionalInfos} </div>
            </div>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label htmlFor="treatment">Treatment Name:</label>
                    <div className={styles.input}>{medical.treatment} </div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="treatmentType">Treatment Type:</label>
                    <div className={styles.input} > {medical.treatmentType} </div>

                </div>
                <div className={styles.field}>
                    <label htmlFor="dosage">Dosage:</label>
                    <div className={styles.input} > {medical.dosage} </div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="administrationFrequency">Administration Frequency:</label>
                    <div className={styles.input} > {medical.administrationFrequency} </div>
                </div>
            </div>

        </div>
    );
};
const Vaccine: React.FC<{ medical: MedicalHistory }> = ({ medical }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };
    return (
        <div className={styles.content}>
                        <h3> Vaccine information</h3>

            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <div className={styles.input} > {formatDate(medical.date)} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <div className={styles.input} > {medical.cabinet} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <div className={styles.input} > {medical.doctor} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="adverseReactions">Adverse Reactions:</label>
                    <div className={styles.input} > {medical.adverseReactions} </div>

                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="additionalInfos">Additional Information:</label>
                <div className={styles.input} > {medical.additionalInfos} </div>
            </div>

            <div className={styles.bottom_part}>
                <div className={styles.field}>
                    <label htmlFor="dosage">Administration Dose:</label>
                    <div className={styles.input} > {medical.dosage} </div>

                </div>
                <div className={styles.field}>
                    <label htmlFor="repetitions">Number of Repetitions:</label>
                    <div className={styles.input} > {medical.repetitions} </div>

                </div>
            </div>
        </div>
    );
}
const Consultation: React.FC<{ medical: MedicalHistory }> = ({ medical }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };

    return (
        <div className={styles.content}>

<h3> Consultation information</h3>

            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <div className={styles.input} > {formatDate(medical.date)} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <div className={styles.input} > {medical.cabinet} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <div className={styles.input} > {medical.doctor} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="type">Type:</label>
                    <div className={styles.input} > {medical.additionalInfos} </div>

                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="symptoms">Symptoms:</label>
                <div className={styles.input} > {medical.symptoms} </div>
            </div>
            <div className={styles.bottom_part}>
                <div className={styles.field}>
                    <label htmlFor="diagnostic">Diagnostic:</label>
                    <div className={styles.input} > {medical.diagnostic} </div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="treatmentNeed">Treatment Prescribed:</label>
                    <div className={styles.input} > {medical.treatmentNeed} </div>

                </div>
            </div>

        </div>
    );
};
const Interventio: React.FC<{ medical: MedicalHistory }> = ({ medical }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };
    return (
        <div className={styles.content}>
            <h3> Intervention information</h3>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Date:</label>
                    <div className={styles.input} > {formatDate(medical.date)} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cabinet">Cabinet:</label>
                    <div className={styles.input} > {medical.cabinet} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="doctor">Doctor:</label>
                    <div className={styles.input} > {medical.doctor} </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="interventionType">Intervention Type:</label>
                    <div className={styles.input} > {medical.interventionType} </div>

                </div>
            </div>
            <div className={styles.field_long}>
                <label htmlFor="animalCondition">Animal Condition:</label>
                <div className={styles.input} > {medical.animalCondition} </div>
            </div>
            <div className={styles.first_part}>
                <div className={styles.field}>
                    <label htmlFor="costs">Costs:</label>
                    <div className={styles.input} > {medical.costs} </div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="duration">Intervention Duration:</label>
                    <div className={styles.input} > {medical.duration} </div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="monitoringDays">Monitoring Days:</label>
                    <div className={styles.input} > {medical.monitoringDays} </div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="regimen">Regimen Necessity:</label>
                    <div className={styles.input} > {medical.regimen} </div>

                </div>
            </div>
        </div>
    );
}

const MedicalHistoryInfo: React.FC = () => {
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>();

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const medicalId = localStorage.getItem('idMedical');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch(`http://localhost:8082/medicalRecord/medical-record/${medicalId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch medical history');
                }

                const data = await response.json();
                setMedicalHistory(data);
            } catch (error) {
                console.error('Error fetching medical history:', error);

            }
        };

        fetchMedicalHistory();
    }, []);

    return (
        <div className={styles.body}>
            <Navbar pagename='' />

            {medicalHistory?.type === 'Tratament' && (
                <div className={styles.informations}>
                    <Treatment medical={medicalHistory} />
                </div>
            )}

            {medicalHistory?.type === 'Vaccine' && (
                <div className={styles.informations}>
                    <Vaccine medical={medicalHistory} />
                </div>
            )}
            {medicalHistory?.type === 'Consultation' && (
                <div className={styles.informations}>
                    <Consultation medical={medicalHistory} />
                </div>
            )}
             {medicalHistory?.type === 'Intervention' && (
                <div className={styles.informations}>
                    <Interventio medical={medicalHistory} />
                </div>
            )}
        </div>
    );
};

export default MedicalHistoryInfo;

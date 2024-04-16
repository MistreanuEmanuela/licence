import React, { useEffect, useState } from 'react';
import styles from './med.module.css';
import Navbar from '../NavBars/NavBar';
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";


interface MedicalHistory {
    id: number;
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

const MedicalHistory: React.FC = () => {
    const [deleteState, setDeleteState] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);

    const [medical, setMedical] = useState<MedicalHistory[]>([
        {
            id: 1,
            type: 'Consultation',
            date: '2023-05-12',
            cabinet: 'City Hospital',
            doctor: 'Dr. Smith',
            symptoms: 'Fever, cough, headache',
            diagnostic: 'Upper respiratory infection',
            treatment: 'Prescribed antibiotics and rest',
            treatmentType: 'Medication',
            treatmentDuration: 7,
            treatmentLocation: 'Home',
            administrationFrequency: 'Twice daily',
            dosage: 500,
            repetitions: 14,
            combat: 'Infection',
            animalCondition: 'Stable',
            costs: 120,
            interventionType: 'Prescription',
            duration: 30,
            monitoringDays: 7,
            regimen: 'Oral medication',
            additionalInfos: 'Avoid exposure to cold weather',
            treatmentNeed: 'Immediate',
            adverseReactions: 'Mild nausea reported',
        },
        {
            id: 2,
            type: 'Surgery',
            date: '2022-11-28',
            cabinet: 'General Hospital',
            doctor: 'Dr. Johnson',
            symptoms: 'Persistent abdominal pain',
            diagnostic: 'Appendicitis',
            treatment: 'Appendectomy',
            treatmentType: 'Surgical procedure',
            treatmentDuration: 1,
            treatmentLocation: 'Hospital',
            administrationFrequency: 'N/A',
            dosage: 0,
            repetitions: 0,
            combat: 'Appendicitis',
            animalCondition: 'Stable post-surgery',
            costs: 3500,
            interventionType: 'Emergency surgery',
            duration: 3,
            monitoringDays: 2,
            regimen: 'Post-operative care',
            additionalInfos: 'Follow-up appointment scheduled in two weeks',
            treatmentNeed: 'Urgent',
            adverseReactions: 'None reported',
        },
        {
            id: 3,
            type: 'Physical Therapy',
            date: '2024-01-10',
            cabinet: 'Rehabilitation Center',
            doctor: 'Dr. Rodriguez',
            symptoms: 'Limited range of motion in shoulder',
            diagnostic: 'Rotator cuff injury',
            treatment: 'Physical therapy sessions',
            treatmentType: 'Therapeutic exercises',
            treatmentDuration: 12,
            treatmentLocation: 'Rehabilitation Center',
            administrationFrequency: 'Twice weekly',
            dosage: 0,
            repetitions: 0,
            combat: 'Muscle weakness and stiffness',
            animalCondition: 'Improving',
            costs: 800,
            interventionType: 'Non-surgical',
            duration: 60,
            monitoringDays: 90,
            regimen: 'Structured exercise program',
            additionalInfos: 'Patient advised to avoid heavy lifting',
            treatmentNeed: 'Ongoing',
            adverseReactions: 'Mild soreness initially',
        }


    ]);
    const handleDelete = () => {
        setDeleteState(true);
    }

    const handleDeleteConfirm = () => {
        setDeleted(true);
        setTimeout(() => {
            setDeleted(false);
            setDeleteState(false);
        }, 5000);

    }
    const handleDeleteCancel = () => {
        setDeleteState(false);
    }
    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            {deleteState &&
            <div id="custom-confirm-dialog" className={styles.confirmDialog}>
            <div className={styles.dialogContent}>
                {!deleted ? (
                    <>
                        <p>Are you sure you want to delete this pet?</p>
                        <div className={styles.buttons}>
                            <button onClick={handleDeleteConfirm} className={styles.confirmButton}>Yes</button>
                            <button onClick={handleDeleteCancel} className={styles.cancelButton}>No</button>
                        </div>
                    </>
                ) : (
                    <p> Deleted successfully.</p>
                )}
            </div>
        </div>
            }
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.column}>Date</th>
                        <th className={styles.column}>Type</th>
                        <th className={styles.column}>Doctor</th>
                        <th className={styles.column}>Cabinet</th>
                        <th className={styles.last}></th>
                    </tr>
                </thead>
                <tbody>
                    {medical.length > 0 ? (
                        medical.map((item, index) => (
                            <tr key={index}>
                                <td className={styles.td}>{item.date}</td>
                                <td className={styles.td}>{item.type}</td>
                                <td className={styles.td}>{item.doctor}</td>
                                <td className={styles.td}>{item.cabinet}</td>
                                <td className={styles.td}>
                                    <button className={styles.more}><IoMdMore /></button>
                                    <div className={styles.dropdownContent}>
                                        <button onClick={handleDelete}>Delete <MdDelete /></button>
                                        <button>More info <IoMdMore /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className={styles.tr}>
                           
                               Nothing to show...
                          </tr>  
                        
                    )}
                </tbody>

            </table>
        </div>

    )
}
export default MedicalHistory;
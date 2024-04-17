import React, { useEffect, useState } from 'react';
import styles from './med.module.css';
import Navbar from '../NavBars/NavBar';
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Delete from '../Components/Animations/Delete';
import { MdNoteAdd } from "react-icons/md";


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

const MedicalHistory: React.FC = () => {
    const [deleteState, setDeleteState] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [medical, setMedical] = useState<MedicalHistory[]>([]);
    const [deletedMedicalId, setDeletedMedicalId] = useState<number | null>(null);
    const history = useNavigate();

    useEffect(() => {
        fetchMedicalHistory();
    }, []);

    const fetchMedicalHistory = async () => {
        const petId = localStorage.getItem("IdPet");
        try {
            const response = await fetch(`http://localhost:8082/medicalRecord/medical-records/${petId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMedical(data);
            } else {
                console.error('Failed to fetch medical history:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching medical history:', error);
        }
    };

    const handleDelete = (id: number) => {
        setDeletedMedicalId(id);
        setDeleteState(true);
    };

    const handleDeleteConfirm = async () => {
        console.log(deletedMedicalId);
        try {
            const response = await fetch(`http://localhost:8082/medicalRecord/deleteMedicalRecord?id=${deletedMedicalId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                console.log("Medical record deleted successfully");
                setDeleted(true);
                fetchMedicalHistory();
            } else {
                console.error('Failed to delete medical record:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting medical record:', error);
        }

        setTimeout(() => {
            setDeleted(false);
            setDeleteState(false);
        }, 1500);
    };

    const handleDeleteCancel = () => {
        setDeleteState(false);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };

    const handleNav = () => {
        history('/medicalHistory')
    };

    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            <div className={styles.button_top}>
                <button onClick={handleNav} className={styles.add}>Add
                <div className={styles.icon}> <MdNoteAdd /></div>

</button>
            </div>
            {deleteState && (
                <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                    <div className={styles.dialogContent}>
                        {!deleted ? (
                            <>
                                <p>Are you sure you want to delete this medical record?</p>
                                <div className={styles.buttons}>
                                    <button onClick={handleDeleteConfirm} className={styles.confirmButton}>Yes</button>
                                    <button onClick={handleDeleteCancel} className={styles.cancelButton}>No</button>
                                </div>
                            </>
                        ) : (
                            <div>
                            <p>Deleted successfully.</p>
                            <Delete/>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <table className={`${styles.table} ${deleteState || deleted ? styles.tableBlur : ''}`}>
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
                                <td className={styles.td}>{formatDate(item.date)}</td>
                                <td className={styles.td}>{item.type}</td>
                                <td className={styles.td}>{item.doctor}</td>
                                <td className={styles.td}>{item.cabinet}</td>
                                <td className={styles.td}>
                                    <button className={styles.more}><IoMdMore /></button>
                                    <div className={styles.dropdownContent}>
                                        <button onClick={() => handleDelete(item.id)}>Delete <MdDelete /></button>
                                        <button>More info <IoMdMore /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className={styles.tr}>
                            <td className={styles.td} colSpan={5}>Nothing to show...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalHistory;

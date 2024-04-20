import React, { useState, useEffect } from 'react';
import styles from './profile.module.css'
import Navbar from '../NavBars/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProfileAnimation from '../Components/Animations/Profile';

interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
}
const Profile = () => {

    const [numberOfPets, setNumberOfPets] = useState<number>(0);
    const [user, setUser] = useState<User>()

    useEffect(() => {
        fetchNumberOfPets();
        fetchUser();
    }, []);

    const fetchNumberOfPets = async () => {
        try {
            const response = await fetch('http://localhost:8082/pet/findNumberOfPets', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch number of pets');
            }

            const data = await response.json();
            setNumberOfPets(data);
        } catch (error) {
            console.error('Error fetching number of pets:', error);
        }
    };
    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:8082/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch number of pets');
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching number of pets:', error);
        }
    
    };
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };
    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            <div className={styles.content}>
                <div className={styles.profile_container}>
                    <div className={styles.text1}><b>ACCOUNT</b></div>
                    <div className={styles.text2}>Edit your name, password, etc.</div>
                    <div className={styles.main}>
                        <div className={styles.left_info}>
                            <ProfileAnimation></ProfileAnimation>
                            <div className={styles.information}>
                                <div>Number of pets in app:</div>
                                <div className={styles.nr_pets}> {numberOfPets}</div>
                            </div>
                        </div>
                        <div className={styles.right_info}>
                            <div className={styles.first_part_info}>
                                <div className={styles.field}>
                                    <div className={styles.label}> Username: </div>
                                    <div className={styles.input}> {user?.username} </div>
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Firstname: </div>
                                    <div className={styles.input}> {user?.firstName} </div>
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Lastname: </div>
                                    <div className={styles.input}> {user?.lastName} </div>
                                </div>

                            </div>
                            <div className={styles.second_part_info}>
                                <div className={styles.field}>
                                    <div className={styles.label}> Password: </div>
                                    <div className={styles.input}> ****************** </div>
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Email: </div>
                                    <div className={styles.input}> {user?.email} </div>
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Birthdate: </div>
                                    <div className={styles.input}> {formatDate(user?.birthdate || '')} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.edit}> Edit your profile</button>

                </div>

            </div>
        </div>
    )
}
export default Profile;
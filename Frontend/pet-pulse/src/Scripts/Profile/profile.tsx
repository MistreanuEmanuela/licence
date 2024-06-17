import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './profile.module.css'
import Navbar from '../NavBars/NavBar';
import { useNavigate } from 'react-router-dom';
import ProfileAnimation from '../Components/Animations/Profile';
import Save from '../Components/Animations/Save'
import WrongInput from '../Components/Animations/badInput';
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

import { TbLogout } from "react-icons/tb";

interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
}

interface UserEdit {
    lastName: string;
    firstName: string;
    birthdate: string;
}

interface changePassword {
    currentPassword: string;
    newPassword: string
}

const Profile = () => {

    const [numberOfPets, setNumberOfPets] = useState<number>(0);
    const [user, setUser] = useState<User>()
    const [userEdit, setUserEdit] = useState<UserEdit>(
        {
            lastName: "",
            firstName: "",
            birthdate: "",
        }
    )
    const [edit, setEdit] = useState<boolean>(false);
    const [save, setSave] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [error, setError] = useState<String>('');
    const [wrong, setWrong] = useState<boolean>(false);
    const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<changePassword>(
        {
            currentPassword: "",
            newPassword: "",
        }
    )
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const history = useNavigate();


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
            setUserEdit(data);
        } catch (error) {
            console.error('Error fetching number of pets:', error);
        }

    };
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChangePassword = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setChangePassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleInputChangeConfirm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConfirmPassword(value);
    };

    const handleEdit = () => (
        setEdit(true)
    );
    const handleCancel = () => {
        setEdit(false);
        setIsEditingPassword(false);
    }

    const handleSave = () => {
        if (userEdit && user) {
            saveEditInfo(userEdit);
        }
        setEdit(false)
    };

    const saveEditInfo = async (editInfo: UserEdit) => {
        const token = localStorage.getItem("token");

        setError('');
        const isValidFirstName = /^[a-zA-Z\s]*$/.test(editInfo.firstName);
        const isValidLastName = /^[a-zA-Z\s]*$/.test(editInfo.lastName);

        if (!isValidFirstName) {
            setError('First name can only contain letters and spaces!');
            console.error('First name can only contain letters and spaces');
            setWrong(true);
            setTimeout(() => {
                setWrong(false)
            }, 2000);
            return;
        }

        if (!isValidLastName) {
            setError('Last name can only contain letters and spaces!');
            console.error('Last name can only contain letters and spaces');
            setWrong(true);
            setTimeout(() => {
                setWrong(false)
            }, 2000);
            return;
        }
        const today = new Date();
        const selectedDate = new Date(editInfo.birthdate);
        const minDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

        if (selectedDate > today) {
            setError('Birthdate cannot be in the future!');
            console.error('Birthdate cannot be in the future');
            setWrong(true);
            setTimeout(() => {
                setWrong(false)
            }, 2000);
            return;
        }

        if (selectedDate > minDate) {
            setError('Birthdate must be at least 10 years ago!');
            console.error('Birthdate must be at least 10 years ago!');
            setTimeout(() => {
                setWrong(false)
            }, 2000);
            return;
        }

        try {
            const response = await fetch('http://localhost:8082/users/editUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editInfo),
            });
            const result = await response.text()
            if (!response.ok) {
                setError(result);
            }

            console.log('User information saved successfully');
            setSave(true);
            setTimeout(() => {
                setSave(false)
            }, 1500);
        } catch (error) {
            console.error('Error saving edited user information:', error);
        }
    }

    const handleButtonChangePasswordPress = () => {
        setIsEditingPassword(true);
    }

    const handleSavePassword = async () => {
        const token = localStorage.getItem("token");

        setError('');
        if (changePassword.newPassword !== confirmPassword) {
            setIsEditingPassword(false);
            setError('The password do not coresponde!');
            console.error('The password do not coresponde!');
            setWrong(true);
            setTimeout(() => {
                setWrong(false)
            }, 2000);
            return;

        }
        if (changePassword.currentPassword === "" || changePassword.newPassword === "") {
            setIsEditingPassword(false);
            setError('Some filds are empty!');
            console.error('Some filds are empty!');
            setWrong(true);
            setTimeout(() => {
                setWrong(false)
            }, 2000);
            return;

        }

        try {
            const response = await fetch('http://localhost:8082/users/changePasswordProfile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(changePassword),
            });
            const result = await response.text()
            if (!response.ok) {
                setError(result);
                setWrong(true);
                setTimeout(() => {
                    setWrong(false)
                }, 1500);
            }

            console.log('User information saved successfully');
            setIsEditingPassword(false);
            setSave(true);
            setTimeout(() => {
                setSave(false)
            }, 1500);
        } catch (error) {
            console.error('Error saving edited user information:', error);
        }
    }
    const handleExitClick = () => {
        setIsExiting(true);

    }
    const handleExitConfirm = () => {
        setIsExiting(true);
        localStorage.setItem("token", "");
        setTimeout(() => {
            history('/', { replace: true });
        }, 10);

    }
    const handleExitCancel = () => {
        setIsExiting(false);

    }


    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            <div className={styles.content}>
                {save && (!wrong) &&
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            <p>Profile updated successfully.</p>
                            <Save />
                        </div>
                    </div>
                }
                {(wrong) &&
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            <p>{error}</p>
                            <WrongInput />
                        </div>
                    </div>
                }
                {(isEditingPassword) &&
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogCont}>
                            <div className={styles.botton_cancel} onClick={handleCancel}><MdCancel /></div>

                            <input
                                className={styles.inputEditPassword}
                                type="password"
                                name="currentPassword"
                                value={changePassword.currentPassword}
                                onChange={handleInputChangePassword}
                                placeholder="Enter current Password"
                            />
                            <input
                                className={styles.inputEditPassword}
                                type="password"
                                name="newPassword"
                                value={changePassword.newPassword}
                                onChange={handleInputChangePassword}
                                placeholder="Enter newPassword"
                            />
                            <input
                                className={styles.inputEditPassword}
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleInputChangeConfirm}
                                placeholder="Confirm new password"
                            />
                            <div><button className={styles.editPassword} onClick={handleSavePassword}> Save </button></div>

                        </div>
                    </div>
                }
                {isExiting &&
                (
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                                <div className={styles.dialogContent}>
                                    <p>Are you sure you want to disconnect?</p>
                                        <div className={styles.buttons}>
                                            <button onClick={handleExitConfirm} className={styles.confirmButton}>Yes</button>
                                            <button onClick={handleExitCancel} className={styles.cancelButton}>No</button>
                                         </div>
                                </div>
                    </div>
                                
                )}
                <button className={styles.out} onClick={handleExitClick}><TbLogout /></button>
                <div className={`${styles.profile_container} ${save || wrong || isEditingPassword || isExiting ? styles.profile_container_blur : ''}`}  >
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
                                    <div className={styles.label}>Firstname:</div>
                                    {edit ? (
                                        <input
                                            className={styles.inputEdit}
                                            type="text"
                                            name="firstName"
                                            value={userEdit.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter new firstName"
                                        />
                                    ) : (
                                        <div className={styles.input}>{user?.firstName}</div>
                                    )}
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Lastname: </div>
                                    {edit ? (
                                        <input
                                            className={styles.inputEdit}
                                            type="text"
                                            name="lastName"
                                            value={userEdit.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter new lastName"
                                        />
                                    ) : (
                                        <div className={styles.input}>{user?.lastName}</div>
                                    )}
                                </div>

                            </div>
                            <div className={styles.second_part_info}>
                                <div className={styles.field}>
                                    <div className={styles.label}> Password: </div>
                                    <div className={styles.input}> ******************
                                        {edit &&
                                            (
                                                < button className={styles.editIcon} onClick={handleButtonChangePasswordPress}> <CiEdit />
                                                </button>
                                            )}
                                    </div>
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Email: </div>
                                    <div className={styles.input}> {user?.email} </div>
                                </div>
                                <div className={styles.field}>
                                    <div className={styles.label}> Birthdate: </div>
                                    {edit ? (
                                        <input
                                            className={styles.inputEdit}
                                            type="date"
                                            name="birthdate"
                                            value={formatDate(userEdit?.birthdate || '')}
                                            onChange={(e) => {
                                                console.log('Input changed:', e.target.value);
                                                handleInputChange(e);
                                            }}
                                            placeholder="Enter new birthdate"
                                        />
                                    ) : (
                                        <div className={styles.input}>{formatDate(user?.birthdate || '')}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {edit ? (
                        <div className={styles.buttons}>
                            <button className={styles.edit} onClick={handleSave}> Save your profile</button>
                            <button className={styles.editCancel} onClick={handleCancel}> Cancel modification</button>
                        </div>

                    ) : (
                        <button className={styles.edit} onClick={handleEdit}> Edit your profile</button>
                    )}
                </div>

            </div>
        </div>
    )
}
export default Profile;
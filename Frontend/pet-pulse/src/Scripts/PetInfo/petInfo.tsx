import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './petInfo.module.css'
import Navbar from '../NavBars/NavBar';
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

interface Pet {
    id: number;
    userId: number;
    name: string;
    breed: string;
    description: string;
    color: string;
    weight: number;
    microchipId: string;
    allergies: string;
    gender: string;
    visibility: string;
    imagePath: string;
    animalType: string;
    birthdate: string;
}

interface Edit {
    id: number;
    name: string;
    description: string;
    weight: number;
    allergies: string;
    birthdate: string;
    visibility: string;
    imagePath: string;
}

const PetInfo: React.FC = () => {
    const [pet, setPet] = useState<Pet | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [editField, setEditField] = useState<string>('');
    const [editInfo, setEditInfo] = useState<Edit>({
        id: 0,
        name: '',
        description: '',
        weight: 0,
        allergies: '',
        birthdate: '',
        visibility: '',
        imagePath: ''
    });

    useEffect(() => {
        const idPet = localStorage.getItem("IdPet")
        if (!idPet) {
            console.error('Pet ID not found in localStorage.');
            return;
        }

        const fetchPetInfo = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('Token not found.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8082/pet/view?id=${idPet}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch pet information');
                }

                const petData = await response.json();
                setPet(petData);
                setEditInfo({ ...petData } as Edit); // Creating a copy of petData for editing
                getImage(petData.imagePath);
            } catch (error) {
                console.error('Error fetching pet information:', error);
            }
        };

        fetchPetInfo();

    }, []);

    const getImage = async (imagePath: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8082/pet/picture?path=${encodeURIComponent(imagePath)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const blob = await response.blob();
            setImageSrc(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    const handleEditClick = () => {
        setEditMode(true); 
    };

    const handleSaveClick = () => {
        if (editInfo && pet) {
            setPet({ ...editInfo } as Pet); 
        }
        setEditMode(false);
    };
    const handleSaveClickFinal = () => {
        if (editInfo && pet) {
            setPet({ ...editInfo } as Pet); 
            saveEditInfo(editInfo); 
        }
        setEditMode(false);
    };

    const saveEditInfo = async (editInfo: Edit) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('http://localhost:8082/pet/editPet', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editInfo),
            });

            if (!response.ok) {
                throw new Error('Failed to save edited pet information');
            }

            console.log('Pet information saved successfully');
        } catch (error) {
            console.error('Error saving edited pet information:', error);
        }
    };

    const handleCancelClick = () => {
        setEditMode(false);
    };

    const handleNameEditClick = () => {
        setEditField("name");
        setEditMode(true);
    };

    const handleWeightEditClick = () => {
        setEditField("weight");
        setEditMode(true);
    };

    const handleAllergiesEditClick = () => {
        setEditField("allergies");
        setEditMode(true);
    };

    const handleBirthdateEditClick = () => {
        setEditField("birthdate");
        setEditMode(true);
    };

    const handleVisibilityEditClick = () => {
        setEditField("visibility");
        setEditMode(true);
    };

    const handleDescriptionEditClick = () => {
        setEditField("description");
        setEditMode(true);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <div className={styles.body}>
                <Navbar pagename="" />
                {pet ? (
                    <div className={styles.information}>
                        <div className={styles.left_part}>
                            {imageSrc && <img src={imageSrc} className={styles.image} alt={pet.name} />}
                            <h2>{pet.name}</h2>
                            <div>Breed: {pet.breed}</div>
                            <div>
                                {/* Editable field: Name */}
                                {editMode && editField === "name" ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editInfo.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter name"
                                        />
                                        <button onClick={handleSaveClick}><FaSave /></button>
                                    </div>
                                ) : (
                                    <div>
                                        {pet.name}
                                        <button onClick={handleNameEditClick}><FaEdit /></button>
                                    </div>
                                )}
                            </div>
                            <div>
                                {/* Editable field: Weight */}
                                {editMode && editField === "weight" ? (
                                    <div>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={editInfo.weight}
                                            onChange={handleInputChange}
                                            placeholder="Enter weight"
                                        />
                                        <button onClick={handleSaveClick}><FaSave /></button>
                                    </div>
                                ) : (
                                    <div>
                                        {pet.weight}
                                        <button onClick={handleWeightEditClick}><FaEdit /></button>
                                    </div>
                                )}
                            </div>
                            <div>
                                {/* Editable field: Allergies */}
                                {editMode && editField === "allergies" ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="allergies"
                                            value={editInfo.allergies}
                                            onChange={handleInputChange}
                                            placeholder="Enter allergies"
                                        />
                                        <button onClick={handleSaveClick}><FaSave /></button>
                                    </div>
                                ) : (
                                    <div>
                                        {pet.allergies}
                                        <button onClick={handleAllergiesEditClick}><FaEdit /></button>
                                    </div>
                                )}
                            </div>
                            <div>
                                {/* Editable field: Birthdate */}
                                {editMode && editField === "birthdate" ? (
                                    <div>
                                        <input
                                            type="date"
                                            name="birthdate"
                                            value={editInfo.birthdate}
                                            onChange={handleInputChange}
                                        />
                                        <button onClick={handleSaveClick}><FaSave /></button>
                                    </div>
                                ) : (
                                    <div>
                                        {pet.birthdate}
                                        <button onClick={handleBirthdateEditClick}><FaEdit /></button>
                                    </div>
                                )}
                            </div>
                            <div>
                                {/* Editable field: Visibility */}
                                {editMode && editField === "visibility" ? (
                                    <div>
                                        <select
                                            name="visibility"
                                            value={editInfo.visibility}
                                            onChange={handleInputChange}
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                        <button onClick={handleSaveClick}><FaSave /></button>
                                    </div>
                                ) : (
                                    <div>
                                        {pet.visibility}
                                        <button onClick={handleVisibilityEditClick}><FaEdit /></button>
                                    </div>
                                )}
                            </div>
                            <div>
                                {/* Editable field: Description */}
                                {editMode && editField === "description" ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editInfo.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter description"
                                        />
                                        <button onClick={handleSaveClick}><FaSave /></button>
                                    </div>
                                ) : (
                                    <div>
                                        {pet.description}
                                        <button onClick={handleDescriptionEditClick}><FaEdit /></button>
                                    </div>
                                )}
                            </div>
                            <div>Color: {pet.color}</div>
                            <div>{pet.allergies} </div>
                        </div>
                        <div className={styles.right_part}>
                            <div>Gender: {pet.gender}</div>
                            <div>Microchip: {pet.microchipId}</div>
                        </div>
                        {/* Edit mode buttons */}
                        {editMode && (
                            <div>
                                <button onClick={handleCancelClick}><FaTimes /></button>
                            </div>
                        )}
                        <button onClick={handleSaveClickFinal}>Save</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default PetInfo;

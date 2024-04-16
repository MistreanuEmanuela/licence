import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './petInfo.module.css'
import Navbar from '../NavBars/NavBar';
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";


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
    const [deletePress, setDeletePress] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);

    const history = useNavigate();

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
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
            }, 5000);
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
    const formattedDate = () => {
        if (pet) {
            const birthdate = new Date(pet.birthdate);
            return `${birthdate.getDate()}-${birthdate.getMonth() + 1}-${birthdate.getFullYear()}`;
        }
    };
    const handleDeletePet = () => {
        setDeletePress(true);
    };

    const handleDeleteConfirm = () => {
        const token = localStorage.getItem("token");
        const idPet = localStorage.getItem("IdPet");

        if (!token || !idPet) {
            console.error("Token or IdPet not available");
            return;
        }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        fetch(`http://localhost:8082/pet/deletePet?id=${idPet}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Pet not found or you don\'t have permission to delete it');
                }
            })
            .then(data => {
                console.log(data);
                setDeleted(true)
                setTimeout(() => {
                    history('/myPets');
                }, 5000);
            })
            .catch(error => {
                console.error('Error deleting pet:', error);
            });
    }
    const handleDeleteCancel = () => {
        setDeletePress(false);
    }
    return (
        <div>
            <div className={styles.body}>
                <Navbar pagename="" />
                {saved &&
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            <p>Pet updated successfully.</p>
                        </div>
                    </div>
                }
                {pet ? (
                    
                    <div className={styles.container}>
                        <button onClick={handleDeletePet} className={styles.delete_button}><MdDelete />
                        </button>
                        {deletePress && (
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
                                        <p>Pet deleted successfully. Redirecting....</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className={styles.information}>

                            <div className={styles.left_part}>
                                {imageSrc && <img src={imageSrc} className={styles.image} alt={pet.name} />}

                                <div className={styles.fild}>
                                    {editMode && editField === "name" ? (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Name:</b></div>

                                            <input className={styles.input_fild}
                                                type="text"
                                                name="name"
                                                value={editInfo.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter name"
                                            />
                                            <button onClick={handleSaveClick} className={styles.edit}><FaSave /></button>
                                            <button onClick={handleCancelClick} className={styles.edit}><FaTimes /></button>

                                        </div>
                                    ) : (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Name:</b></div>
                                            <div className={styles.content}>{pet.name}
                                                <button onClick={handleNameEditClick} className={styles.edit}><FaEdit /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.fild}>
                                    {editMode && editField === "description" ? (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Description:</b></div>

                                            <input className={styles.input_fild}
                                                type="textare"
                                                name="description"
                                                value={editInfo.description}
                                                onChange={handleInputChange}
                                                placeholder="Enter description"
                                            />
                                            <button onClick={handleSaveClick} className={styles.edit}><FaSave /></button>
                                            <button onClick={handleCancelClick} className={styles.edit}><FaTimes /></button>
                                        </div>
                                    ) : (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Description:</b></div>

                                            <div className={styles.content}>{pet.description}
                                                <button onClick={handleDescriptionEditClick} className={styles.edit}><FaEdit /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                              

                            </div>
                            <div className={styles.right_part}>
                                <div className={styles.fild}>
                                    <div className={styles.info}>
                                        <div className={styles.label_name}><b>Breed:</b></div>

                                        <div className={styles.content}>{pet.breed}</div>
                                    </div>
                                </div>
                                <div className={styles.fild}>
                                    {editMode && editField === "weight" ? (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Weight:</b></div>

                                            <input className={styles.input_fild}
                                                type="number"
                                                name="weight"
                                                value={editInfo.weight}
                                                onChange={handleInputChange}
                                                placeholder="Enter weight"
                                            />
                                            <button onClick={handleSaveClick} className={styles.edit}><FaSave /></button>
                                            <button onClick={handleCancelClick} className={styles.edit}><FaTimes /></button>
                                        </div>
                                    ) : (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Weight:</b></div>

                                            <div className={styles.content}> {pet.weight}
                                                <button onClick={handleWeightEditClick} className={styles.edit}><FaEdit /></button> </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.fild}>

                                    {editMode && editField === "allergies" ? (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Allergies:</b></div>

                                            <input className={styles.input_fild}
                                                type="text"
                                                name="allergies"
                                                value={editInfo.allergies}
                                                onChange={handleInputChange}
                                                placeholder="Enter allergies"
                                            />
                                            <button onClick={handleSaveClick} className={styles.edit}><FaSave /></button>
                                            <button onClick={handleCancelClick} className={styles.edit}><FaTimes /></button>
                                        </div>
                                    ) : (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Allergies:</b></div>

                                            <div className={styles.content}> {pet.allergies}
                                                <button onClick={handleAllergiesEditClick} className={styles.edit}><FaEdit /></button> </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.fild}>
                                    {editMode && editField === "birthdate" ? (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Birthdate:</b></div>

                                            <input className={styles.input_fild}
                                                type="date"
                                                name="birthdate"
                                                value={editInfo.birthdate}
                                                onChange={handleInputChange}
                                            />
                                            <button onClick={handleSaveClick} className={styles.edit}><FaSave /></button>
                                            <button onClick={handleCancelClick} className={styles.edit}><FaTimes /></button>
                                        </div>
                                    ) : (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Birthdate:</b></div>

                                            <div className={styles.content}>{formattedDate()}
                                                <button onClick={handleBirthdateEditClick} className={styles.edit}><FaEdit /></button></div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.fild}>
                                    {editMode && editField === "visibility" ? (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Visibility:</b></div>

                                            <select className={styles.input_fild}
                                                name="visibility"
                                                value={editInfo.visibility}
                                                onChange={handleInputChange}
                                            >
                                                <option value="public">Public</option>
                                                <option value="private">Private</option>
                                            </select>
                                            <button onClick={handleSaveClick} className={styles.edit}><FaSave /></button>
                                            <button onClick={handleCancelClick} className={styles.edit}><FaTimes /></button>

                                        </div>
                                    ) : (
                                        <div className={styles.info}>
                                            <div className={styles.label_name}><b>Visibility:</b></div>

                                            <div className={styles.content}>{pet.visibility}
                                                <button onClick={handleVisibilityEditClick} className={styles.edit}><FaEdit /></button> </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.fild}>
                                    <div className={styles.info}>
                                        <div className={styles.label_name}><b>Color:</b></div>

                                        <div className={styles.content}>{pet.color}</div>
                                    </div>
                                </div>



                                <div className={styles.fild}>
                                    <div className={styles.info}>
                                        <div className={styles.label_name}><b>Gendre:</b></div>

                                        <div className={styles.content}>{pet.gender}</div>
                                    </div>
                                </div>
                                <div className={styles.fild}>
                                    <div className={styles.info}>
                                        <div className={styles.label_name}><b>MicrocipId:</b></div>

                                        <div className={styles.content}>{pet.microchipId}</div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                        <button onClick={handleSaveClickFinal} className={styles.save}>Save</button>  
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div >
    );
};

export default PetInfo;

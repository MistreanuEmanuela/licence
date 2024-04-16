import React, { useEffect, useState } from 'react';
import styles from './addPet.module.css'
import Navbar from '../NavBars/NavBar';
import { PiCat } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';



interface Pet {
    name: string;
    description: string;
    breed: string;
    birthdate: string;
    color: string;
    gender: string;
    weight: number;
    microchipId: string;
    allergies: string;
    imagePath: string;
    visibility: string;
    animalType: string;
}

interface Dog {
    id: number;
    name: string;
}

interface Cat {
    id: number;
    name: string;
}
const AddPet: React.FC = () => {
    const [added, setAdded] = useState<Boolean>(false);
    const [pet, setPet] = useState<Pet>({
        name: '',
        description: '',
        breed: '',
        birthdate: '',
        color: '',
        gender: '',
        weight: 0,
        microchipId: '',
        allergies: '',
        imagePath: '',
        visibility: '',
        animalType: 'Dog'
    });
    const [path, SetPath] = useState<string>('');
    const [petType, setPetType] = useState<string>('Dog');
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [cats, setCats] = useState<Cat[]>([]);
    const [file, setFile] = useState<File | null>(null); // State to hold the file
    const history = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        fetch('http://localhost:8082/dog/alldogs', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then((data: Dog[]) => {
                setDogs(data);
            })
            .catch(error => console.error('Error fetching dogs:', error));

        fetch('http://localhost:8082/cat/allcats', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then((data: Cat[]) => {
                setCats(data);
            })
            .catch(error => console.error('Error fetching dogs:', error));
    }, [])


    const handlePetType = (stringValue: string) => {
        pet.animalType = stringValue
        setPetType(stringValue);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPet({ ...pet, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    SetPath(e.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            console.error('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8082/pet/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const imagePath = await response.text();
                pet.imagePath = imagePath;

                console.log('Image uploaded:', imagePath);
            } else {
                console.error('Failed to upload image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        if (pet.imagePath !== '') {
            console.log(pet.imagePath);
            console.log(pet);

            const token = localStorage.getItem("token");

            if (!token) {
                console.error('Token not found');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions: RequestInit = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(pet),
                redirect: "follow"
            };

            try {
                const response = await fetch("http://localhost:8082/pet/addPet", requestOptions);
                const result = await response.text()
                console.log(result)
                if (response.ok) {
                    console.log("created")
                    setAdded(true);
                    setTimeout(() => {
                        history('/myPets');
                    }, 5000);
                }
                if (!response.ok) {
                    throw new Error('Failed to create account');
                }

            } catch (error) {
                console.error(error);
            }
        }
    };
    const formatDate = (birthday: string): string => {
        return birthday;
    };
    return (
        <div>
            <Navbar pagename="cats" />
            <div className={styles.body}>
                {added &&
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            <p>Pet added successfully. Redirecting....</p>
                        </div>
                    </div>
                }
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.buttons}>
                        {petType === 'Dog' &&
                            <button type="button" className={styles.button_pet_active} onClick={(e) => handlePetType('Dog')}>
                                <div className={styles.icon}><PiDog /></div>Add a new dog friend </button>
                        }
                        {petType !== 'Dog' &&
                            <button type="button" className={styles.button_pet} onClick={(e) => handlePetType('Dog')}>
                                <div className={styles.icon_transparente}><PiDog /> </div>
                                Add a new dog friend</button>

                        }
                        {petType === 'Cat' &&
                            <button type="button" className={styles.button_pet_active_cat} onClick={(e) => handlePetType('Cat')}>
                                <div className={styles.icon}><PiCat /></div>
                                Add a new cat friend
                            </button>

                        }
                        {petType !== 'Cat' &&
                            <button type="button" className={styles.button_pet} onClick={(e) => handlePetType('Cat')}>
                                <div className={styles.icon_transparente}><PiCat /></div>
                                Add a new cat friend </button>

                        }
                    </div>
                    <div className={petType === 'Cat' ? `${styles.second_active}` : styles.second}>
                        <div className={styles.picture_and_desc}>
                            <div className={styles.left_part}>
                                <div className={styles.label}>
                                    <label htmlFor="name"> {petType} name: </label></div>
                                <input className={styles.input_text} type="text" id="name" name="name" value={pet.name} onChange={handleInputChange} />
                                <div className={styles.label}>
                                    <label htmlFor="description">{petType} summary description:</label>
                                </div>
                                <textarea className={styles.input_textare} id="description" name="description" value={pet.description} onChange={handleInputChange} />
                            </div>


                            <div className={styles.right_part}>
                                <div className={styles.fileInputContainer}>
                                    <input className={styles.fileInput} type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
                                    <label htmlFor="photo" className={styles.customButton}>
                                        {path && <img src={path} alt="Dog" className={styles.image} />}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.left_part_second}>
                                <div className={styles.fild}>
                                    <div className={styles.label2}>
                                        <label htmlFor="color">Color:</label></div>
                                    <input className={styles.input_text} type="text" id="color" name="color" value={pet.color} onChange={handleInputChange} />
                                </div>

                                <div className={styles.fild}>
                                    <div className={styles.label}>
                                        <label htmlFor="weight">Weight:</label>
                                    </div>
                                    <input className={styles.input_text} type="number" id="weight" name="weight" value={pet.weight} onChange={handleInputChange} />
                                </div>

                                <div className={styles.fild}>
                                    <div className={styles.label}>
                                        <label htmlFor="microchipId">Microchip ID:</label> </div>
                                    <input className={styles.input_text} type="text" id="microchipId" name="microchipId" value={pet.microchipId} onChange={handleInputChange} />
                                </div>

                                <div className={styles.fild}>
                                    <div className={styles.label}>
                                        <label htmlFor="allergies">Allergies:</label> </div>
                                    <input className={styles.input_text} type="text" id="allergies" name="allergies" value={pet.allergies} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className={styles.right_part_second}>
                                <div className={styles.fild22}>
                                    <label className={styles.label}>Gender:</label>
                                    <div className={styles.labels}>
                                        <div className={styles.ratio_label}>

                                            <label >
                                                <input type="radio" name="gender" value="male" checked={pet.gender === 'male'} onChange={handleInputChange} />
                                                Male
                                            </label></div>
                                        <div className={styles.ratio_label}>

                                            <label>
                                                <input type="radio" name="gender" value="female" checked={pet.gender === 'female'} onChange={handleInputChange} />
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.select}>
                                    <div className={styles.label}>
                                        <label htmlFor="breed">Breed:</label></div>
                                    <select className={styles.select_box} id="breed" name="breed" value={pet.breed} onChange={handleInputChange}>
                                        <option value="">Select Breed</option>
                                        {petType === 'Dog' && dogs.map(dog => (
                                            <option className={styles.options} key={dog.id} value={dog.name}>{dog.name}</option>
                                        ))}
                                        {petType === 'Cat' && cats.map(cat => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <div>
                                        <div className={styles.select}>
                                            <div className={styles.label}>
                                                <label htmlFor="birthday">Birthday:</label>
                                            </div>
                                            <input className={styles.select_box} type="date" id="birthdate" name="birthdate" value={pet.birthdate} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.fild22}>
                                    <label className={styles.label}>Visibility:</label>
                                    <div className={styles.labels}>
                                        <div className={styles.ratio_label}>

                                            <label >
                                                <input type="radio" name="visibility" value="public" checked={pet.visibility === 'public'} onChange={handleInputChange} />
                                                public
                                            </label></div>
                                        <div className={styles.ratio_label}>

                                            <label>
                                                <input type="radio" name="visibility" value="private" checked={pet.visibility === 'private'} onChange={handleInputChange} />
                                                private
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className={styles.submit}>

                            Save pet </button>

                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddPet;

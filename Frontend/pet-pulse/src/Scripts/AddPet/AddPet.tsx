import React, { useEffect, useState } from 'react';
import styles from './addPet.module.css'
import Navbar from '../NavBars/NavBar';
import { PiCat } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import Save from '../Components/Animations/NewPage'
import Loading from '../Components/Animations/Loading';



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
    const [breed, setBread] = useState<string>('');
    const [accuracy, setAccuracy] = useState<string>('');
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
    const [file, setFile] = useState<File | null>(null);
    const history = useNavigate();
    const [error, setError] = useState<string>('');
    const [isCalculating, setIsCalculating] = useState<boolean>(false);


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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBread('');
        setAccuracy('');
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
    
            setFile(selectedFile);
    
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && event.target.result) {
                    SetPath(event.target.result as string);
                }
            };
            reader.readAsDataURL(selectedFile);
    
            const formData = new FormData();
            formData.append('file', selectedFile);
            setIsCalculating(true);
            try {
                const response = await fetch('http://localhost:8082/pet/findBreed', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData,
                });
    
                if (response.ok) {
                    const breed = await response.text();
                    const predictions = breed.split(':');
                    const most_predicted = predictions[1].split(' ');
                    console.log(most_predicted)
                    console.log("We think you pet is:", predictions[1], "with accuracy: ",predictions[2])
                    setIsCalculating(false);
                    setBread(most_predicted[1].replace('_', ' '));
                    const ac = predictions[2].split(',')[0];
                    setAccuracy(ac);
                    console.log('Breed:', breed);
                } else {
                    console.error('Failed to upload image:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            setError('');
    
        if (!file) {
            setError('Please select a file');
            console.error('Please select a file');
            return;
        }
    
        const today = new Date();
        const selectedDate = new Date(pet.birthdate);
        if (selectedDate > today) {
            setError('Birthdate cannot be in the future');
            console.error('Birthdate cannot be in the future');
            return;
        }
    
        // if (pet.weight <= 0) {
        //     setError('Weight must be greater than 0');
        //     console.error('Weight must be greater than 0');
        //     return;
        // }
        console.log(breed)
        setPet({ ...pet, [breed]: breed });
        pet.breed = breed

        if (pet.breed === '') {
            setError('select a breed');
            console.error('Breed unselected');
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
                    }, 2000);
                }
                if (!response.ok) {
                    setError(result);
                }
    
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div>
            <Navbar pagename="cats" />
            <div className={styles.body}>

                {added &&
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            <p>Pet added successfully. Redirecting....</p>
                            <Save />
                        </div>
                    </div>
                }
                <form className={`${styles.form} ${added ? styles.addedForm : ''}`} onSubmit={handleSubmit}>
                
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
                        {error && (
                            <div className={styles.errorContainer}>
                                <p className={styles.error}>{error}</p>
                            </div>
                        )}
                        {breed && (
                            <div className={styles.ai}> We think your pet is a {breed} with probability {accuracy} </div>
                        )
                        }
                        { isCalculating && (
                            <div className={styles.ai}> <Loading/> </div>
                        )
                        }
                        
                        <div className={styles.picture_and_desc}>
                            <div className={styles.left_part}>
                                <div className={styles.label}>
                                    <label htmlFor="name"> {petType} name: </label></div>
                                <input className={styles.input_text} type="text" id="name" name="name" value={pet.name} onChange={handleInputChange} required/>
                                <div className={styles.label}>
                                    <label htmlFor="description">{petType} summary description:</label>
                                </div>
                                <textarea className={styles.input_textare} id="description" name="description" value={pet.description} onChange={handleInputChange} required/>
                            </div>


                            <div className={styles.right_part}>
                                <div className={styles.fileInputContainer}>
                                    <input className={styles.fileInput} type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required/>
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
                                    <input className={styles.input_text} type="text" id="color" name="color" value={pet.color} onChange={handleInputChange} required/>
                                </div>

                                <div className={styles.fild}>
                                    <div className={styles.label}>
                                        <label htmlFor="weight">Weight:</label>
                                    </div>
                                    <input className={styles.input_text} type="number" id="weight" name="weight" value={pet.weight} onChange={handleInputChange} required/>
                                </div>

                                <div className={styles.fild}>
                                    <div className={styles.label}>
                                        <label htmlFor="microchipId">Microchip ID:</label> </div>
                                    <input className={styles.input_text} type="text" id="microchipId" name="microchipId" value={pet.microchipId} onChange={handleInputChange}required />
                                </div>

                                <div className={styles.fild}>
                                    <div className={styles.label}>
                                        <label htmlFor="allergies">Allergies:</label> </div>
                                    <input className={styles.input_text} type="text" id="allergies" name="allergies" value={pet.allergies} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className={styles.right_part_second}>
                                <div className={styles.fild22}>
                                    <label className={styles.label}>Gender:</label>
                                    <div className={styles.labels}>
                                        <div className={styles.ratio_label}>

                                            <label >
                                                <input type="radio" name="gender" value="male" checked={pet.gender === 'male'} onChange={handleInputChange} required/>
                                                Male
                                            </label></div>
                                        <div className={styles.ratio_label}>

                                            <label>
                                                <input type="radio" name="gender" value="female" checked={pet.gender === 'female'} onChange={handleInputChange} required />
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.select}>
                                    <div className={styles.label}>
                                        <label htmlFor="breed">Breed:</label></div>
                                    <select className={styles.select_box} id="breed" name="breed" value={pet.breed} onChange={handleInputChange} required>
                                        <option value={breed}>{breed}</option>
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

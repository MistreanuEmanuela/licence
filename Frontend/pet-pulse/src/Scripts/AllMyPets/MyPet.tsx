import React, { useEffect, useState } from 'react';
import styles from './MyPet.module.css';
import Navbar from '../NavBars/NavBar';
import { useNavigate } from 'react-router-dom';

interface Pet {
    id: number;
    name: string;
    breed: string;
    age: string;
    color: string;
    gender: string;
    imagePath: string;
    animalType: string;
}

const MyPet: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [imageSrcs, setImageSrcs] = useState<{ [key: string]: string | null }>({});
    const [hoveredPetId, setHoveredPetId] = useState<number | null>(null);
    const history = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch('http://localhost:8082/pet/findMyPet', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then((data: Pet[]) => {
                setPets(data);
                preloadImages(data); // Preload images
            })
            .catch(error => console.error('Error fetching pets:', error));
    }, []);

    const preloadImages = async (pets: Pet[]) => {
        const srcs: { [key: string]: string | null } = {};
        for (const pet of pets) {
            try {
                const src = await getImageSrc(pet.imagePath);
                srcs[pet.id.toString()] = src;
            } catch (error) {
                console.error('Error preloading image:', error);
                srcs[pet.id.toString()] = null;
            }
        }
        setImageSrcs(srcs);
    };

    const getImageSrc = async (imagePath: string): Promise<string | null> => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8082/pet/picture?path=${encodeURIComponent(imagePath)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };

    const handleMouseEnter = (petId: number) => {
        setHoveredPetId(petId);
    };

    const handleMouseLeave = () => {
        setHoveredPetId(null);
    };
    const handleNavigate = () => {
        history('/AddPet');
    };

    const handleNav = (id: Number) => {
        const id_S = String(id);
        localStorage.setItem("IdPet", id_S);
        history('/petInfo');
    };
    const calculateAge = (dob: string): string => {
        const today = new Date();
        const birthDate = new Date(dob);
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        
        if (months < 0) {
            years = years-1;
            months += 12;
        }
        
        return `${years} years, ${months} months`;
    };

    return (
        <div className={styles.body}>
            <Navbar pagename="" />

            <div className={styles.container}>
                <div className={styles.petsContainer}>
                    {pets.map(pet => (
                        <><div key={pet.id} className={styles.petContainer} onMouseEnter={() => handleMouseEnter(pet.id)} onMouseLeave={handleMouseLeave}>
                            <div className={styles.front} style={{ display: hoveredPetId === pet.id ? 'none' : 'block' }}>
                                {imageSrcs[pet.id.toString()] !== null ? (
                                    <img src={imageSrcs[pet.id.toString()] || ''} alt={pet.name} className={styles.image} />
                                ) : (
                                    <div className={styles.loading}>Loading...</div>
                                )}
                            </div>
                            <div className={styles.back} style={{ display: hoveredPetId === pet.id ? 'block' : 'none' }}>
                                <div className={styles.title}>{pet.name} </div>
                                <div className={styles.infos}>
                                    <div>Breed: {pet.breed}</div>
                                    <div>Age: {calculateAge(pet.age)}</div>
                                    <div>Color: {pet.color}</div>
                                    <div>Gender: {pet.gender}</div>
                                </div>
                                <button className={styles.more} onClick={() => handleNav(pet.id)}> More info </button>
                            </div>
                        </div></>
                    ))}
                    <button className={styles.add} onClick={handleNavigate}></button>
                </div>
        
            </div>
        </div>
    );
};

export default MyPet;

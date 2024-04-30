import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './petFind.module.css';
import Navbar from '../NavBars/NavBar';
import Loading from '../Components/Animations/Loading';
import { MdCancel } from "react-icons/md";

interface FormCat {
    apartmentLiving: boolean;
    otherPet: boolean;
    frequentTravels: boolean;
    freeTimeToAccord: boolean;
    kids: boolean;
    affection: number;
    playfulness: number;
    problemWithCatHair: boolean;
    intelligence: number;
}

interface PetStar {

    id: number,
    idCat: number,
    name: string,
    affection: number,
    shedding: number,
    health: number,
    playfulness: number,
    kidFriendly: number,
    vocalize: number,
    intelligence: number,
    groom: number,
    strangers: number,
    petFriendly: number

}

const CatFind: React.FC = () => {
    const [part, setPart] = useState<string>('default')
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [result, SetResult] = useState<PetStar>();
    const [images, setImages] = useState<string[]>([]);

    const [formData, setFormData] = useState<FormCat>({
        apartmentLiving: false,
        otherPet: false,
        frequentTravels: false,
        freeTimeToAccord: false,
        kids: false,
        affection: 1,
        playfulness: 1,
        problemWithCatHair: false,
        intelligence: 1,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Math.min(Math.max(parseInt(value), 1), 5) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsCalculating(true);
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8082/starRatingCat/findBestFit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            SetResult(data);

      
                setTimeout(() => {
                     setIsCalculating(false);
                }, 1000);



        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleExit = () => {
        setIsCalculating(false);
        setImages([]);
        SetResult(undefined);
    }

    const findPicture = (breed: string) => {
        console.log(breed);
        const searchQuery =    `${breed}`;
        const accessKey = "Okf32cAXDulQsI4EhqJqul2lWKEitSjN0FH5CQMcSvY";
        const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                setImages(data.results.map((image: any) => image.urls.small));
            })
            .catch(error => console.error('Error fetching images:', error));
    }
    useEffect(() => {
        if (result && result.name) {
            setTimeout(() => {
                findPicture(`${result.name} cat`);
            }, 500);
        }
    }, [result]);

    return (
        <div>
            <form onSubmit={handleSubmit} className={`${styles.form} ${isCalculating || result ? styles.form_blur : ''}`}>
                <div className={styles.elements}>
                    <div className={styles.lateral_buttons}>
                        <button  type= 'button' onClick={() => setPart('default') } className={`${styles.button} ${part === 'default' ? styles.button_active : ''}`}> Default questions</button>
                        <button type= 'button'  onClick={() => setPart('preferinces')} className={`${styles.button} ${part === 'preferinces' ? styles.button_active : ''}`}>Preferices</button>

                    </div>
                    {part === 'default' && (
                        <div className={styles.form_inputs}>
                            <div className={styles.title}> Enter your information to help to find your best cat! </div>
                            <><label className={styles.input}>
                                Apartment Living:
                                <select className={styles.select} name="apartmentLiving" value={formData.apartmentLiving.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                                <label className={styles.input}>
                                    Do you have other pets?:
                                    <select className={styles.select} name="otherPet" value={formData.otherPet.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label ><br /><label className={styles.input}>
                                    Frequent Travels?:
                                    <select className={styles.select} name="frequentTravels" value={formData.frequentTravels.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /><label className={styles.input}>
                                    Free Time to Accord?:
                                    <select className={styles.select} name="freeTimeToAccord" value={formData.freeTimeToAccord.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /><label className={styles.input}>
                                    Kids?:
                                    <select className={styles.select} name="kids" value={formData.kids.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /></>
                        </div>
                    )}
                    {part === 'preferinces' && (
                        <div className={styles.form_inputs}>
                            <div className={styles.title}> How do you prefere to be your cat? </div>

                            <><label className={styles.input}>
                                Affection (1-5):
                                <input className={styles.select}
                                    type="number"
                                    name="affection"
                                    min="1"
                                    max="5"
                                    value={formData.affection}
                                    onChange={handleChange} />
                            </label><br /><label className={styles.input}>
                                    Playfulness (1-5):
                                    <input className={styles.select}
                                        type="number"
                                        name="playfulness"
                                        min="1"
                                        max="5"
                                        value={formData.playfulness}
                                        onChange={handleChange} />
                                </label><br /><label className={styles.input}>
                                    Intelligence (1-5):
                                    <input className={styles.select}
                                        type="number"
                                        name="intelligence"
                                        min="1"
                                        max="5"
                                        value={formData.intelligence}
                                        onChange={handleChange} />
                                </label><br /></>
                        </div>
                    )}
                </div>
                <button type="submit" className={styles.button_send}>Submit</button>
            </form>
            {(isCalculating || result) && (
                <div className={`${styles.response} ${isCalculating ? styles.response_padding : ''}`}>
                    {isCalculating &&
                        (
                            <Loading />
                        )}
                    {result &&  !isCalculating && images.length > 0 && (
                        <>      <div className={styles.botton_cancel} onClick={handleExit}><MdCancel /></div>
                            <>
                                <div className={styles.imageContainer}>
                                    {images.map((imageUrl, index) => (
                                        index < 2 && (
                                            <img key={index} src={imageUrl} alt={`Image ${index}`} className={styles.responseImage} />
                                        )
                                    ))}
                                </div>
                                <h2> Your perfect match cat is a: <span style={{ color: 'green' }}>{result.name}</span></h2>
                                <div className={styles.star}>
                                <div className={styles.starInfo}>
                                    <b>Affection level: </b>
                                    {result?.affection && <img src={`/DesignPicture/${result.affection}.png`} alt="Apartament Living" />}
                                </div>
                                <div className={styles.starInfo}><b>Inteligence: </b> 
                                {result?.intelligence && <img src={`/DesignPicture/${result.intelligence}.png`} alt="Inteligence" />}


                                </div>
                                <div className={styles.starInfo}><b>Playfulness: </b>
                                {result?.playfulness && <img src={`/DesignPicture/${result.playfulness}.png`} alt="Alone" />}
                                </div>
                                <div className={styles.starInfo}><b>Kid frendly: </b> 
                                {result?.kidFriendly && <img src={`/DesignPicture/${result.kidFriendly}.png`} alt="Inteligence" />}

                                </div>
                                <div className={styles.starInfo}><b>Groom level: </b> {result?.groom
                                && <img src={`/DesignPicture/${result.groom}.png`} alt="play" />
                                }</div>
                                <div className={styles.starInfo}><b>Strangers acceptance: </b> {result?.strangers
                                && <img src={`/DesignPicture/${result.strangers}.png`} alt="sensibility" />
                                }</div>

                            </div>
                            </></>
                    )}
                </div>
            )}
        </div>
    );
};

const PetFind: React.FC = () => {
    const [pet, setPet] = useState<string>('cat');
    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            {pet === 'cat' &&
                <div className={styles.content}> <CatFind></CatFind></div>
            }
        </div>
    );
};

export default PetFind;

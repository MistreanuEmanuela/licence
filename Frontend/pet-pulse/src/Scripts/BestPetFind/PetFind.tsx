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
interface FormDog {
    appartementLiving: boolean,
    travel: boolean,
    kids: boolean,
    dogs: boolean,
    timeForCare: boolean,
    disponibilityForBuyingMedicine: boolean,
    timeForExercise: boolean,
    big: boolean,
    train: boolean,
    energy: boolean,
    playfulness: boolean,
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

interface DogStar {

    id: number,
    idDog: number,
    name: string,
    apartmentLiving: number,
    noviceOwner: number,
    sensibility: number,
    alone: number,
    coldWater: number,
    hotWater: number,
    affection: number,
    kidFriendly: number,
    dogFriendly: number,
    strangersFriendly: number,
    shedding: number,
    drooling: number,
    groom: number,
    healthy: number,
    weightGain: number,
    size: number,
    trainability: number,
    intelligence: number,
    mouthiness: number,
    preyDrive: number,
    bark: number,
    wanderlust: number,
    energy: number,
    intensity: number,
    exercise: number,
    playfulness: number,

}
const DogFind: React.FC = () => {
    const [part, setPart] = useState<string>('default')
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [result, SetResult] = useState<DogStar>();
    const [images, setImages] = useState<string[]>([]);

    const [formData, setFormData] = useState<FormDog>({
        appartementLiving: false,
        travel: false,
        kids: false,
        dogs: false,
        timeForCare: false,
        disponibilityForBuyingMedicine: false,
        timeForExercise: false,
        big: false,
        train: false,
        energy: false,
        playfulness: false,
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
            const response = await fetch('http://localhost:8082/starRating/findBestFit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
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
        const searchQuery = `${breed}`;
        const accessKey = "***********************************";
        const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setImages(data.results.map((image: any) => image.urls.small));
            })
            .catch(error => console.error('Error fetching images:', error));
    }
    useEffect(() => {
        if (result && result.name) {
            setTimeout(() => {
                findPicture(`${result.name} dog`);
            }, 500);
        }
    }, [result]);

    return (
    <div className={styles.content_form}>
        <form onSubmit={handleSubmit} className={`${styles.form} ${isCalculating || result ? styles.form_blur : ''}`}>
            <div className={styles.elements}>
                <div className={styles.lateral_buttons}>
                    <button type='button' onClick={() => setPart('default')} className={`${styles.button} ${part === 'default' ? styles.button_active : ''}`}> Default questions</button>
                    <button type='button' onClick={() => setPart('preferinces')} className={`${styles.button} ${part === 'preferinces' ? styles.button_active : ''}`}>Preferices</button>

                </div>
                {part === 'default' && (
                    <div className={styles.form_inputs}>
                        <div className={styles.title}> Enter your information to help to find your best cat! </div>
                        <><label className={styles.input}>
                        Do you live in an apartment?
                        <select className={styles.select} name="appartementLiving" value={formData.appartementLiving.toString()} onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </label><br />
                            <label className={styles.input}>
                                Do you have other pets?
                                <select className={styles.select} name="dogs" value={formData.dogs.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                            <label className={styles.input}>
                            Do you travel frequently?
                                <select className={styles.select} name="travel" value={formData.travel.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                            <label className={styles.input}>
                            Do you have free time to dedicate to a dog?
                                <select className={styles.select} name="timeForCare" value={formData.timeForCare.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                            <label className={styles.input}>
                                Do you have kids?
                                <select className={styles.select} name="kids" value={formData.kids.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                            <label className={styles.input}>
                                Do you have disponibility for medicine?
                                <select className={styles.select} name="disponibilityForBuyingMedicine" value={formData.disponibilityForBuyingMedicine.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />

                            <label className={styles.input}>
                                Do you have time for dog exercise every day?
                                <select className={styles.select} name="timeForExercise" value={formData.timeForExercise.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                        </>
                    </div>
                )}
                {part === 'preferinces' && (
                    <div className={styles.left_part}>
                        <div className={styles.form_inputs}>
                            <div className={styles.title}> How do you prefere to be your dog? </div>

                            <><label className={styles.input}>
                                Do you want a big dog?
                                <select className={styles.select} name="big" value={formData.big.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                                <label className={styles.input}>
                                    Do you want to train the dog?
                                    <select className={styles.select} name="train" value={formData.train.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br />
                                <label className={styles.input}>
                                    Do you want a energy dog?
                                    <select className={styles.select} name="energy" value={formData.energy.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br />
                                <label className={styles.input}>
                                    Do you want a playfulness dog?
                                    <select className={styles.select} name="playfulness" value={formData.playfulness.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br />
                            </>
                        </div><div>   <button type="submit" className={styles.button_send}>Submit</button> </div>

                    </div>
                )}
            </div>
        </form>
        {(isCalculating || result) && (
            <div className={`${styles.response} ${isCalculating ? styles.response_padding : ''}`}>
                {isCalculating &&
                    (
                        <Loading />
                    )}
                {result && !isCalculating && images.length > 0 && (
                    <>      <div className={styles.botton_cancel} onClick={handleExit}><MdCancel /></div>
                        <>
                            <div className={styles.imageContainer}>
                                {images.map((imageUrl, index) => (
                                    index < 2 && (
                                        <img key={index} src={imageUrl} alt={`Image ${index}`} className={styles.responseImage} />
                                    )
                                ))}
                            </div>
                            <h2> Your perfect match dog is a: <span style={{ color: 'green' }}>{result.name}</span></h2>
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
                                <div className={styles.starInfo}><b>Strangers acceptance: </b> {result?.strangersFriendly
                                    && <img src={`/DesignPicture/${result.strangersFriendly}.png`} alt="strangers" />
                                }</div>
                                <div className={styles.starInfo}><b>Alone adaptability: </b> {result?.alone
                                    && <img src={`/DesignPicture/${result.alone}.png`} alt="strangers" />
                                }</div>
                                <div className={styles.starInfo}><b>Appartament acceptance: </b> {result?.apartmentLiving
                                    && <img src={`/DesignPicture/${result.apartmentLiving}.png`} alt="strangers" />
                                }</div>
                                <div className={styles.starInfo}><b>Other pets acceptance: </b> {result?.dogFriendly
                                    && <img src={`/DesignPicture/${result.dogFriendly}.png`} alt="strangers" />
                                }</div>
                                <div className={styles.starInfo}><b>Appartament acceptance: </b> {result?.apartmentLiving
                                    && <img src={`/DesignPicture/${result.apartmentLiving}.png`} alt="strangers" />
                                }</div>

                                <div className={styles.starInfo}><b>Bark tendance: </b> {result?.bark
                                    && <img src={`/DesignPicture/${result.bark}.png`} alt="strangers" />
                                }</div>

                                <div className={styles.starInfo}><b>Exercise needs: </b> {result?.energy
                                    && <img src={`/DesignPicture/${result.energy}.png`} alt="strangers" />
                                }</div>

                                <div className={styles.starInfo}><b>Healty: </b> {result?.healthy
                                    && <img src={`/DesignPicture/${result.healthy}.png`} alt="strangers" />
                                }</div>

                                </div>
                            </></>
                    )}
                </div>
            )}
        </div>
    );
};

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
        const searchQuery = `${breed}`;
        const accessKey = "Okf32cAXDulQsI4EhqJqul2lWKEitSjN0FH5CQMcSvY";
        const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
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
                        <button type='button' onClick={() => setPart('default')} className={`${styles.button} ${part === 'default' ? styles.button_active : ''}`}> Default questions</button>
                        <button type='button' onClick={() => setPart('preferinces')} className={`${styles.button} ${part === 'preferinces' ? styles.button_active : ''}`}>Preferices</button>

                    </div>
                    {part === 'default' && (
                        <div className={styles.form_inputs}>
                            <div className={styles.title}> Enter your information to help to find your best cat! </div>
                            <><label className={styles.input}>
                                Do you live in an apartment?
                                <select className={styles.select} name="apartmentLiving" value={formData.apartmentLiving.toString()} onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label><br />
                                <label className={styles.input}>
                                    Do you have other pets?
                                    <select className={styles.select} name="otherPet" value={formData.otherPet.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /><label className={styles.input}>
                                    Do you travel frequently?
                                    <select className={styles.select} name="frequentTravels" value={formData.frequentTravels.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /><label className={styles.input}>
                                Are you disposed to dedicate free time to a cat?
                                    <select className={styles.select} name="freeTimeToAccord" value={formData.freeTimeToAccord.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /><label className={styles.input}>
                                    Do you have kids?
                                    <select className={styles.select} name="kids" value={formData.kids.toString()} onChange={handleChange}>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </label><br /></>
                        </div>
                    )}
                    {part === 'preferinces' && (
                        <div className={styles.left_part}>
                            <div className={styles.form_inputs}>
                                <div className={styles.title}> How do you prefere to be your cat? </div>

                                <><label className={styles.input}>
                                    Affection (1-5)
                                    <input className={styles.select}
                                        type="number"
                                        name="affection"
                                        min="1"
                                        max="5"
                                        value={formData.affection}
                                        onChange={handleChange} />
                                </label><br /><label className={styles.input}>
                                        Playfulness (1-5)
                                        <input className={styles.select}
                                            type="number"
                                            name="playfulness"
                                            min="1"
                                            max="5"
                                            value={formData.playfulness}
                                            onChange={handleChange} />
                                    </label><br /><label className={styles.input}>
                                        Intelligence (1-5)
                                        <input className={styles.select}
                                            type="number"
                                            name="intelligence"
                                            min="1"
                                            max="5"
                                            value={formData.intelligence}
                                            onChange={handleChange} />
                                    </label><br /></>
                            </div><div>   <button type="submit" className={styles.button_send}>Submit</button> </div>

                        </div>
                    )}
                </div>
            </form>
            {(isCalculating || result) && (
                <div className={`${styles.response} ${isCalculating ? styles.response_padding : ''}`}>
                    {isCalculating &&
                        (
                            <Loading />
                        )}
                    {result && !isCalculating && images.length > 0 && (
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
    const [pet, setPet] = useState<string>('');
    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            { pet === '' && (
                <div className={styles.buttons}> 
                    <button className={styles.petChooseCat} onClick={() => setPet('cat')}>
                    
                    </button>
                    <button className={styles.petChooseDog} onClick={() => setPet('dog')}>

                    </button>
                </div> )
            }
            {pet === 'cat' &&
                <div className={styles.content}> <CatFind></CatFind></div>
            }
            {pet === 'dog' &&
                            <div className={styles.content}> <DogFind></DogFind></div>

            }
        </div>
    );
};

export default PetFind;

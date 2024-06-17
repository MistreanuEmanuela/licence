import React, { useState, useEffect } from 'react';
import styles from "./CatInfo.module.css";
import Navbar from '../NavBars/NavBar';
interface Cat {
    name: string;
    general: string;
    size: string;
    personality: string;
    health: string;
    coat: string;
    friendship: string;
    care: string;
}

interface quick_info {
    idCat: number;
    origin: string;
    size: string;
    lifespan: string;
    coat: string;
    temperament: string;
}

interface starRating {

    idCat: number;
    affection: number;
    playfulness: number;
    kidFriendly: number;
    intelligence: number;
    petFriendly: number;
    groom: number;
    strangers: number;
}
const token = localStorage.getItem("token");
const id = localStorage.getItem("catId");

const CatInfo: React.FC<{}> = () => {
    const [cat, setCat] = useState<Cat | null>(null);
    const [catPicture, setCatPicture] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [quickInfo, setQuickInfo] = useState<quick_info | null>(null);
    const [star, setStar] = useState<starRating | null>(null);
    useEffect(() => {

        const token = localStorage.getItem("token");
        const id = localStorage.getItem("catId");
        if (!token || !id) {
            return;
        }

        fetch(`http://localhost:8082/cat/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cat details');
                }
                return response.json();
            })
            .then(data => setCat(data))
            .catch(error => console.error('Error fetching cat details:', error));

        fetch(`http://localhost:8082/catQuickInfo/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cat details');
                }
                return response.json();
            })
            .then(data => setQuickInfo(data))
            .catch(error => console.error('Error fetching cat details:', error));

        fetch(`http://localhost:8082/starRatingCat/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cat details');
                }
                return response.json();
            })
            .then(data => setStar(data))
            .catch(error => console.error('Error fetching cat details:', error));
    }, []);
    useEffect(() => {
        if (cat?.name !== undefined) {
            fetch(`http://localhost:8082/cat/picture/${cat?.name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch cat picture');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    setCatPicture(url);
                })
                .catch(error => console.error('Error fetching cat picture:', error));
        }
    }, [cat]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setTimeout(() => {
            const element = document.getElementById('category');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    };

    return (
        <div className={styles.body}>
            <Navbar pagename="" />
            <div className={styles.dog_info}>
                {cat && (
                    <>
                        <div className={styles.dog_details}>
                            <div className={styles.left_container}>
                                {catPicture && (
                                    <>
                                        <div className={styles.dog_img}>
                                            <img className={styles.image} src={catPicture} alt="cat" />
                                        </div>
                                        <div className={styles.name}>{cat.name}</div>
                                    </>
                                )}
                            </div>
                            <div className={styles.right_container}>
                                <div className={styles.title}> General Info</div>
                                <div className={styles.content}>{cat.general}</div>
                            </div>
                        </div>
                        <div className={styles.quick_info}>
                            <div className={styles.info}>
                                <div className={styles.information}>
                                    <b><i>Origin: </i></b>{quickInfo?.origin}
                                </div>
                                <div className={styles.information}>
                                    <b><i>  Lifespan:</i></b> {quickInfo?.lifespan}
                                </div>
                                <div className={styles.information}>
                                    <i><b>Size: </b></i>  {quickInfo?.size}
                                </div>
                                <div className={styles.information}>
                                    <b><i> Coat:</i></b> {quickInfo?.coat}
                                </div>
                                <div className={styles.information}>
                                    <b><i>Temperament:</i></b> {quickInfo?.temperament}
                                </div>
                            </div>
                            <div className={styles.star}>
                                <div className={styles.starInfo}>
                                    <b>Affection level: </b>
                                    {star?.affection && <img src={`/DesignPicture/${star.affection}.png`} alt="Apartament Living" />}
                                </div>
                                <div className={styles.starInfo}><b>Inteligence: </b> 
                                {star?.intelligence && <img src={`/DesignPicture/${star.intelligence}.png`} alt="Inteligence" />}


                                </div>
                                <div className={styles.starInfo}><b>Playfulness: </b>
                                {star?.playfulness && <img src={`/DesignPicture/${star.playfulness}.png`} alt="Alone" />}
                                </div>
                                <div className={styles.starInfo}><b>Kid frendly: </b> 
                                {star?.kidFriendly && <img src={`/DesignPicture/${star.kidFriendly}.png`} alt="Inteligence" />}

                                </div>
                                <div className={styles.starInfo}><b>Groom level: </b> {star?.groom
                                && <img src={`/DesignPicture/${star.groom}.png`} alt="play" />
                                }</div>
                                <div className={styles.starInfo}><b>Strangers acceptance: </b> {star?.strangers
                                && <img src={`/DesignPicture/${star.strangers}.png`} alt="sensibility" />
                                }</div>

                            </div>
                        </div>
                        <div className={styles.second_part_info} >
                            <div className={styles.button_container}>
                                <button className={selectedCategory === "care" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}

                                    onClick={() => handleCategoryClick("care")}>
                                    <div className={styles.button_care_image}> </div>
                                    <div className={styles.button_name}>Care</div>
                                </button>
                                <button className={selectedCategory === "health" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}
                                    onClick={() => handleCategoryClick("health")}>
                                    <div className={styles.button_health_image}> </div>
                                    <div className={styles.button_name}>Health</div>
                                </button>

                                <button className={selectedCategory === "personality" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}
                                    onClick={() => handleCategoryClick("personality")}>
                                    <div className={styles.button_personality_image}> </div>
                                    <div className={styles.button_name}>Personality</div>
                                </button>

                                <button className={selectedCategory === "size" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}
                                    onClick={() => handleCategoryClick("size")}>
                                    <div className={styles.button_size_image}> </div>
                                    <div className={styles.button_name}>Size</div>
                                </button>


                                <button className={selectedCategory === "coat" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}
                                    onClick={() => handleCategoryClick("coat")}>
                                    <div className={styles.button_coat_image}> </div>
                                    <div className={styles.button_name}>Coat</div>
                                </button>

                                <button className={selectedCategory === "frendly" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}
                                    onClick={() => handleCategoryClick("frendly")}>
                                    <div className={styles.button_frendly_image}> </div>
                                    <div className={styles.button_name}>Friendship</div>
                                </button>
                            </div>

                            {selectedCategory !== null &&
                                <div className={styles.display_container2} id='category'>
                                    {selectedCategory === "health" &&
                                        <><div className={styles.title_and_picture}>
                                            <div className={styles.title2}>{cat.name} <div className={styles.subtitle}>Health </div></div>

                                            {/* <div className={styles.info_picture_health}></div> */}
                                                </div>
                                            <div className={styles.content}>{cat.health}</div></>
                                    }
                                 
                                    {selectedCategory === "personality" &&
                                        <><div className={styles.title_and_picture}>
                                            <div className={styles.title2}>{cat.name} <div className={styles.subtitle}>Personality </div></div>
                                            {/* <div className={styles.info_picture_personality}></div> */}
                                            </div>
                                            <div className={styles.content}>{cat.personality}</div></>}
                                    {selectedCategory === "size" && <><div className={styles.title_and_picture}>
                                        <div className={styles.title2}>{cat.name} <div className={styles.subtitle}>Size </div></div>
                                        {/* <div className={styles.info_picture_size}></div> */}
                                        </div>
                                        <div className={styles.content}>{cat.size}</div></>}
                                    {selectedCategory === "coat" && <><div className={styles.title_and_picture}>
                                        <div className={styles.title2}>{cat.name} <div className={styles.subtitle}>Coat </div></div>
                                        {/* <div className={styles.info_picture_coat}></div> */}
                                        </div>
                                        <div className={styles.content} >{cat.coat}</div></>}
                                    {selectedCategory === "frendly" && <><div className={styles.title_and_picture}>
                                        <div className={styles.title2}>{cat.name} <div className={styles.subtitle}>Friendship </div></div>
                                        {/* <div className={styles.info_picture_friendship}></div> */}
                                        </div>
                                        <div className={styles.content}>{cat.friendship}</div></>}
                                    {selectedCategory === "care" && <><div className={styles.title_and_picture}>
                                        <div className={styles.title2}>{cat.name} <div className={styles.subtitle}>Care </div></div>
                                        {/* <div className={styles.info_picture_care}></div> */}
                                        </div>
                                        <div className={styles.content}>{cat.care}</div></>}
                                    {selectedCategory === ""}
                                </div>
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}

export default CatInfo;

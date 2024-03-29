import React, { useState, useEffect } from 'react';
import styles from "./DogInfo.module.css";
import Navbar from '../NavBars/NavBar';
interface Dog {
    name: string;
    general: string;
    overview: string;
    size: string;
    personality: string;
    health: string;
    feeding: string;
    coat: string;
    friendship: string;
    care: string;
}

const DogInfo: React.FC<{}> = () => {
    const [dog, setDog] = useState<Dog | null>(null);
    const [dogPicture, setDogPicture] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const id = 61;
    const name = "Akita";

    useEffect(() => {
        fetch(`http://localhost:8082/dog/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTE3MjIzNDcsImV4cCI6MTcxMjA4MjM0N30.weZPK-yXdRvnSgqKoMrkvAhabym3Xxc36rpyrtCb2A75TVup5hbgLlEc_-GFVrNAlbqfhnutvZjvnw36L4xbEQ'
            }
        })
            .then(response => response.json())
            .then(data => setDog(data))
            .catch(error => console.error('Error fetching dog details:', error));


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTE3MjIzNDcsImV4cCI6MTcxMjA4MjM0N30.weZPK-yXdRvnSgqKoMrkvAhabym3Xxc36rpyrtCb2A75TVup5hbgLlEc_-GFVrNAlbqfhnutvZjvnw36L4xbEQ");

        fetch(`http://localhost:8082/dog/picture/${name}`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        })
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setDogPicture(url);
            })
            .catch(error => console.error('Error fetching dog picture:', error));

    }, [id, name]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        console.log(dog);
        setTimeout(() => { // Delay scrolling by 2 seconds
            const element = document.getElementById('category');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'end' }); 
            }
        }, 500); // 2000 milliseconds = 2 seconds
    };

    return (
        <div className={styles.body} id='category'>
            <Navbar pagename="" />
            <div className={styles.dog_info}>
                {dog && (
                    <>
                        <div className={styles.dog_details}>
                            <div className={styles.left_container}>
                                {dogPicture && (
                                    <>
                                        <div className={styles.dog_img}>
                                            <img className={styles.image} src={dogPicture} alt="Dog" />
                                        </div>
                                        <div className={styles.name}>{dog.name}</div>
                                    </>
                                )}
                            </div>
                            <div className={styles.right_container}>
                                <div className={styles.title}> General Info</div>
                                <div className={styles.content}>{dog.general}</div>
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


                                <button className={selectedCategory === "feeding" ? `${styles.button_care} ${styles.button_care_pressed}` : styles.button_care}
                                    onClick={() => handleCategoryClick("feeding")}>
                                    <div className={styles.button_food_image}> </div>
                                    <div className={styles.button_name}>Fiding</div>
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
                            <div className={styles.display_container2} >
                                {selectedCategory === "health" && <p>{dog.health}</p>}
                                {selectedCategory === "feeding" && <p>{dog.feeding}</p>}
                                {selectedCategory === "personality" && <p>{dog.personality}</p>}
                                {selectedCategory === "size" && <p>{dog.size}</p>}
                                {selectedCategory === "coat" && <p>{dog.coat}</p>}
                                {selectedCategory === "frendly" && <p>{dog.friendship}</p>}
                                {selectedCategory === "care" && <p>{dog.care}</p>}
                                {selectedCategory === ""}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}

export default DogInfo;

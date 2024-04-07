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
const token = localStorage.getItem("token");
const id = localStorage.getItem("dogId");

const DogInfo: React.FC<{}> = () => {
    const [dog, setDog] = useState<Dog | null>(null);
    const [dogPicture, setDogPicture] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [oneTm, setOneTm] = useState<Boolean>(false);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const id = localStorage.getItem("dogId");
        if (!token || !id) {
            return;
        }

        fetch(`http://localhost:8082/dog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch dog details');
                }
                return response.json();
            })
            .then(data => setDog(data))
            .catch(error => console.error('Error fetching dog details:', error));
    }, []);
    useEffect(() => {
        if (dog?.name !== undefined) {
            fetch(`http://localhost:8082/dog/picture/${dog?.name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch dog picture');
                }
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setDogPicture(url);
            })
            .catch(error => console.error('Error fetching dog picture:', error));
        }
    }, [dog]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        console.log(dog);
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
                                    <div className={styles.button_name}>Feeding</div>
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
                            {selectedCategory !==null &&
                            <div className={styles.display_container2}  id='category'>
                                {selectedCategory === "health" && 
                                <><div className={styles.title_and_picture}>
                                  <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Health </div></div>
                                
                                        <div className={styles.info_picture_health}></div></div>
                                        <div className={styles.content}>{dog.health}</div></>
                                }
                                {selectedCategory === "feeding" && 
                                 <><div className={styles.title_and_picture}>
                                 <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Feeding </div></div>
                                       <div className={styles.info_picture_feeding}></div></div> 
                                       <div className={styles.content}>{dog.feeding}</div></>
}
                                {selectedCategory === "personality" && 
                                 <><div className={styles.title_and_picture}>
                                 <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Personality </div></div>
                                       <div className={styles.info_picture_personality}></div></div> 
                                       <div className={styles.content}>{dog.personality}</div></>}
                                {selectedCategory === "size" && <><div className={styles.title_and_picture}>
                                 <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Size </div></div>
                                       <div className={styles.info_picture_size}></div></div> 
                                       <div className={styles.content}>{dog.size}</div></>}
                                {selectedCategory === "coat" &&  <><div className={styles.title_and_picture}>
                                 <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Coat </div></div>
                                       <div className={styles.info_picture_coat}></div></div> 
                                       <div className={styles.content} >{dog.coat}</div></>}
                                {selectedCategory === "frendly" &&  <><div className={styles.title_and_picture}>
                                 <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Friendship </div></div>
                                       <div className={styles.info_picture_friendship}></div></div> 
                                       <div className={styles.content}>{dog.friendship}</div></>}
                                {selectedCategory === "care" &&  <><div className={styles.title_and_picture}>
                                 <div className={styles.title2}>{dog.name} <div className={styles.subtitle}>Care </div></div>
                                       <div className={styles.info_picture_care}></div></div> 
                                       <div className={styles.content}>{dog.care}</div></>}
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

export default DogInfo;

import React, { useState, useEffect } from 'react';
import styles from "./DogInfo.module.css";
import Navbar from '../NavBars/SimpleNavBar';
import Logo from '../Logo/logo';
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
function addLineBreaks(text: string): string {
    const breakAfter = [".", ";", "\n"];

    for (const char of breakAfter) {
        text = text.split(char).join(char + "\n");
    }

    return text;
}

const DogInfo: React.FC<{}> = () => {
    const [dog, setDog] = useState<Dog | null>(null);
    const [dogPicture, setDogPicture] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const id = 347;
    const name = "German Shepherd Dog.png";

    useEffect(() => {
        fetch(`http://localhost:8082/dog/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTA5NTg3NzcsImV4cCI6MTcxMTMxODc3N30.ifErpqHCq4-3A85zGeloraEzpR43WK8chDxRmBDsIOMHYV9vPzhOcz9cPJsd8RIuhGDMN7x64IdpRsZF1JUa0A'
            }
        })
            .then(response => response.json())
            .then(data => setDog(data))
            .catch(error => console.error('Error fetching dog details:', error));


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTA5NTg3NzcsImV4cCI6MTcxMTMxODc3N30.ifErpqHCq4-3A85zGeloraEzpR43WK8chDxRmBDsIOMHYV9vPzhOcz9cPJsd8RIuhGDMN7x64IdpRsZF1JUa0A");

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
        };

    return (
        <><div className={styles.navbar}>
            <Logo size={"50%"}></Logo>
            <div className={styles.center}></div>
            <Navbar></Navbar>
        </div><div className={styles.dog_info}>
                {dog && (
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
                            <div className="button-container">
                                <button onClick={() => handleCategoryClick("general")}>General</button>
                                <button onClick={() => handleCategoryClick("health")}>Health</button>
                                <button onClick={() => handleCategoryClick("feeding")}>Feeding</button>
                                <button onClick={() => handleCategoryClick("personality")}>Personality</button>
                                <button onClick={() => handleCategoryClick("size")}>Size</button>
                            </div>
                            <div className={styles.display_container}>
                                {selectedCategory === "general" && <p>{dog.general}</p>}
                                {selectedCategory === "health" && <p>{dog.health}</p>}
                                {selectedCategory === "feeding" && <p>{dog.feeding}</p>}
                                {selectedCategory === "personality" && <p>{dog.personality}</p>}
                                {selectedCategory === "size" && <p>{dog.size}</p>}
                                {selectedCategory === ""}
                            </div>
                        </div>
                    </div>
                )}
            </div></>
    );
}

export default DogInfo;

import React, { useEffect, useState } from 'react';
import styles from './breed.module.css';
import Navbar from '../NavBars/NavBar';
import Loading from '../Components/Animations/Loading';
import { MdCancel } from "react-icons/md";


const BreedRecognition: React.FC = () => {
    const [path, setPath] = useState<string>('');
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [isResponse, setIsResponse] = useState<boolean>(false);
    const [breed, setBreed] = useState<string>('');
    const [accuracy, setAccuracy] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [images, setImages] = useState<string[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBreed('');
        setAccuracy('');
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target && event.target.result) {
                    setPath(event.target.result as string);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSend = async () => {
        const formData = new FormData();
        if (!file) {
            console.error('No file selected');
            return;
        }
        formData.append('file', file);
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
                const breedData = await response.text();
                const predictions = breedData.split(':');
                const mostPredicted = predictions[1].split(' ');
                console.log(mostPredicted);
                console.log("We think your pet is:", mostPredicted[1].replace('_', ' '), "with accuracy:", predictions[2]);
                setIsCalculating(false);
                setBreed(mostPredicted[1].replace('_', ' '));
                const accuracyValue = predictions[2].split(',')[0];
                setAccuracy(accuracyValue);
                console.log('Breed:', breedData);
                findPicture(mostPredicted[1].replace('_', ' '));
                setIsResponse(true);
            } else {
                console.error('Failed to upload image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const findPicture = (breed: string) => {
        console.log(breed);
        const searchQuery = breed;
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
    const handleExit = () => {
        setBreed('');
        setAccuracy('');
        setIsCalculating(false);
        setIsResponse(false);
        setImages([]);
    }

    return (
        <div className={styles.body}>
            <Navbar pagename='' />
            <div className={styles.page}>
                <div className={`${styles.content} ${isCalculating || isResponse ? styles.content_blur : ''}`}>
                    <div className={styles.fileInputContainer}>
                        <input className={styles.fileInput} type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required />
                        <label htmlFor="photo" className={styles.customButton}>
                            {path && <img src={path} alt="Dog" className={styles.image} />}
                        </label>
                    </div>
                    <button onClick={handleSend} className={styles.button_send}>Find</button>
                </div>
                {(isCalculating || isResponse) && (
                    <div className={`${styles.response} ${isCalculating  ? styles.response_padding : ''}`}>
                        {isCalculating &&
                            (
                                <Loading />
                            )}
                        {isResponse && images.length > 0 && (
                            <>      <div className={styles.botton_cancel} onClick={handleExit}><MdCancel /></div>
                            <>
                            <div className={styles.imageContainer}>
                                {images.map((imageUrl, index) => (
                                    index < 3 && (
                                        <img key={index} src={imageUrl} alt={`Image ${index}`} className={styles.responseImage} />
                                    )
                                ))}
                            </div>
                                <div className={styles.text}>We think your pet is: {breed} with accuracy: {accuracy} </div>
                            </></>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BreedRecognition;
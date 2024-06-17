import React, { useState, useEffect } from 'react';
import styles from './principalPage.module.css'
import Navbar from '../NavBars/NavBar';
import { Link } from 'react-router-dom';
import Maps from '../Components/GoogleMaps/Maps';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Components/MenuChatCommunity/Buttons';

interface InfoDog {
  id: number;
  name: string;
  description: string;
}

interface InfoCat {
  id: number;
  name: string;
  description: string;
}

const PrincipalPage = () => {
  const [infoDogs, setInfoDogs] = useState<InfoDog[]>();
  const [infoDogs2, setInfoDogs2] = useState<InfoDog[]>();
  const [infoCats, setInfoCats] = useState<InfoCat[]>();
  const history = useNavigate();
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };

  const handleSetDogId = (dogId: number) => {
    const dogIdString = String(dogId);
    localStorage.setItem("dogId", dogIdString);
    history('/dog');
  };
  const handleSetCatId = (catId: number) => {
    const catIdString = String(catId);
    localStorage.setItem("catId", catIdString);
    history('/cat');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dog = 'labrador';
        const cat = 'siamese';
        const dog2 = 'French Bulldog'
        const token = localStorage.getItem("token");
  
        const responseDog = await fetch(`http://localhost:8082/dog/all-dogs-searched?name=${dog}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataDog = await responseDog.json();
        setInfoDogs(dataDog);
        console.log(dataDog);

        const responseDog2 = await fetch(`http://localhost:8082/dog/all-dogs-searched?name=${dog2}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataDog2 = await responseDog2.json();
        setInfoDogs2(dataDog2);
        console.log(dataDog2);
  
        const responseCat = await fetch(`http://localhost:8082/cat/all-cats-searched?name=${cat}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataCat = await responseCat.json();
        setInfoCats(dataCat);
        console.log(dataCat);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  
  }, []);
  return (
    <div className={styles.body}>
      <Navbar pagename="home" />
      <Buttons></Buttons>
      <div className={styles.find_pet_banner_first}>
        <div className={styles.info}>
          <div className={styles.title}>Find your best match</div>
          <div className={styles.content}> Finding the perfect furry (or not so furry) companion can be a delightful journey, but sometimes it's hard to decide which type of pet is the best fit for your lifestyle and preferences. That's where we come in! Take a moment to fill out our simple form below, and we'll provide you with a personalized pet suggestion tailored just for you. Whether you're a dog lover, a cat enthusiast, or considering something a bit more exotic, we're here to guide you on your path to pet parenthood.</div>
          <Link to="/findPet" className={styles.link}>Let's get started!</Link>
        </div>
        <div className={styles.picture_info}></div>
      </div>
      <div className={styles.informational}>
        <div className={styles.container}>
        {infoDogs2 && (
            infoDogs2.map((dog, index) => (
              <div className={styles.element} key={index} >
                <img src={`./DesignPicture/${dog.name}.png`} alt={dog.name} className={styles.picture} />
                <div className={styles.content}>
                  <div className={styles.name}><b>{dog.name}</b></div>
                  <div className={styles.description}>{truncateText(dog.description, 300)}</div>
                  <button className={styles.readMore} onClick={() => handleSetDogId(dog.id)}> Read More </button>
                </div>
              </div>
            ))
          )}

          {infoCats && (
            infoCats.map((cat, index) => (
              <div className={styles.element} key={index} >
                <img src={`./DesignPicture/${cat.name}.png`} alt={cat.name} className={styles.picture} />
                <div className={styles.content}>
                  <div className={styles.name}><b>{cat.name}</b></div>
                  <div className={styles.description}>{truncateText(cat.description, 300)}</div>
                  <button className={styles.readMore} onClick={() => handleSetCatId(cat.id)}> Read More </button>
                </div>
              </div>
            ))
          )}
         
          {infoDogs && (
            infoDogs.map((dog, index) => (
              <div className={styles.element} key={index} >
                <img src={`./DesignPicture/${dog.name}.png`} alt={dog.name} className={styles.picture} />
                <div className={styles.content}>
                  <div className={styles.name}><b>{dog.name}</b></div>
                  <div className={styles.description}>{truncateText(dog.description, 300)}</div>
                  <button className={styles.readMore} onClick={() => handleSetDogId(dog.id)}> Read More </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
   
      <div className={styles.find_pet_banner}>
        <div className={styles.info}>
          <div className={styles.title}>Meet Our ChatBot Solution</div>
          <div className={styles.content}> Do you find yourself in a pickle with your pet's care? Whether it's about their health, behavior, or just general advice, our specialized pet chatbot is here to lend a helping paw! Our furry-friendly AI companion is equipped with knowledge and solutions tailored to pets of all shapes and sizes..</div>
          <Link to="./chatbot" className={styles.link}>Give it a try!</Link>
        </div>
        <div className={styles.picture2}></div>
      </div>

      <div className={styles.find_pet_banner}>
        <div className={styles.info}>
          <div className={styles.title}>You don't know what breed is your pet?!</div>
          <div className={styles.content}> Would you like to discover the likely breed of your cat or dog? Even if they're not purebred, we can help identify their most prominent breed traits. Simply follow the link, upload a picture of your pet, and we'll provide insights into their likely breed characteristics!</div>
          <Link to="/breedRecognition" className={styles.link}>Let's find!</Link>
        </div>
        <div className={styles.picture3}></div>
      </div>


      <div className={styles.harti}>
        <div> <h2>Looking for veterinary care for your pet? Find nearby veterinary clinics:</h2> </div>
        <Maps />
      </div>
    </div>
  );
}

export default PrincipalPage;
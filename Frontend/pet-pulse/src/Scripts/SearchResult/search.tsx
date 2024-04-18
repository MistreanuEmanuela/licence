import React, { useState, useEffect } from 'react';
import styles from './search.module.css';
import Navbar from '../NavBars/NavBar';
import Searching from '../Components/Animations/Searching';
import NotFound from '../Components/Animations/NotFound';
import { useNavigate } from 'react-router-dom';

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

interface Pet {
  id: number;
  name: string;
  breed: string;
  color: string;
  gender: string;
  birthdate: string;
  imagePath: string;
  animalType: string;
  lastNameOwner: string;
  firstNameOwner: string;
}
const Search: React.FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [infoDogs, setInfoDogs] = useState<InfoDog[]>();
  const [infoCats, setInfoCats] = useState<InfoCat[]>();
  const [pets, setPets] = useState<Pet[]>();
  const input = localStorage.getItem("search")

  const history = useNavigate();

  useEffect(() => {
    setInfoCats([])
    setInfoDogs([])
    setPets([])
    const input = localStorage.getItem("search")
    const token = localStorage.getItem("token")
    fetch(`http://localhost:8082/dog/all-dogs-searched?name=${input}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: InfoDog[]) => {
        setInfoDogs(data);
        console.log(data)
      })
      .catch(error => console.error('Error fetching dogs:', error));


    fetch(`http://localhost:8082/cat/all-cats-searched?name=${input}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: InfoCat[]) => {
        setInfoCats(data);
        console.log(data)
      })
      .catch(error => console.error('Error fetching cats:', error));

    fetch(`http://localhost:8082/pet/all-pets-searched?name=${input}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Pet[]) => {
        setPets(data);
        console.log(data)
      })
      .catch(error => console.error('Error fetching cats:', error));
    const timeoutId = setTimeout(() => {
      setIsSearching(false);
    }, 3000);
  }, [input]);

  const truncateText = (text: string, maxLength:number) => {
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

  return (
    <div className={styles.body}>
      <Navbar pagename="" />
      <div className={styles.search_text}>
        <div>
          Search Results for: <i> {input}</i>
        </div>
      </div>
      <div className={styles.result_container}>
        {isSearching &&
          (
            <Searching />
          )}
        {!infoCats && !infoDogs && !pets && !isSearching &&
          (
            <NotFound />
          )
        }
        {(infoCats || infoDogs)  && !isSearching &&
          (
            <div className={styles.informational}>
              <div className={styles.container}>
              {infoCats && (
                infoCats.map((cat, index) => (
                  <div className={styles.element} key={index} >
                    <img src={`./Cats/${cat.name}.png`} alt={cat.name} className={styles.picture} />
                    <div className={styles.content}>
                    <div className={styles.name}><b>{cat.name}</b></div>
                    <div className={styles.description}>{truncateText(cat.description, 300)}</div>
                    <button className={styles.readMore} onClick={() => handleSetCatId(cat.id)}> Read More </button>
                    </div>
                  </div>
                ))
              )}
              {infoDogs && !isSearching && (
                infoDogs.map((dog, index) => (
                  <div className={styles.element} key={index} >
                    <img src={`./Dogs/${dog.name}.png`} alt={dog.name} className={styles.picture} />
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
          )
        }
        {pets && !isSearching && (
          <div className={styles.pets_container}>
            {pets.map((pet, index) => (
              <div className={styles.element}> {pet.name} </div>
            ))}
          </div>
        )

        }

      </div>
    </div>
  );
};
export default Search;
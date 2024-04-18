import React, { useState, useEffect } from 'react';
import styles from './search.module.css';
import Navbar from '../NavBars/NavBar';
import Searching from '../Components/Animations/Searching';
import NotFound from '../Components/Animations/NotFound';
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

  useEffect(() => {
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
}, []);

  const input = localStorage.getItem("search")
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
              <Searching/>
          )}
          {!infoCats && !infoDogs && !pets &&
          (
            <NotFound/>
          )
          }
      </div>
    </div>
  );
};
export default Search;
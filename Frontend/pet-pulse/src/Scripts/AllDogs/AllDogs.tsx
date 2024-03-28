import React, { useState, useEffect } from 'react';
import Logo from '../Logo/logo';
import styles from './AllDogs.module.css';
import Navbar from '../NavBars/NavBar';
interface Dog {
  id: number;
  name: string;
  picture: string;
}

const AllDogs: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(16);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [dogChange, setDogChange] = useState<boolean>(false);

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSubFilter = (subFilter: string) => {
    console.log('Selected sub-filter:', subFilter);
  };

  const [colorHovered, setColorHovered] = useState<boolean>(false);
  const [sizeHovered, setSizeHovered] = useState<boolean>(false);
  const [coatHovered, setCoatHovered] = useState<boolean>(false);
  const [lifespanHovered, setLifespanHovered] = useState<boolean>(false);
  const [letterHovered, setLetterHovered] = useState<boolean>(false);

  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (selectedFilter === '') {
      fetchAllDogs();
    }
  }, [selectedFilter]);


  const fetchAllDogs = () => {
    fetch('http://localhost:8082/dog/alldogs', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTE2Mjg4ODYsImV4cCI6MTcxMTk4ODg4Nn0.AzC0BLK8wUbzI4Db5-2QKbesggXP57cYZaq92WOpL-iZ63gOxRHU6-xF3XWMGbq6WZJW7iDwDG10oBoKo0lyCw',
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const fetchDogPicture = (dog: Dog): Promise<Dog> => {
    return fetch(`http://localhost:8082/dog/picture/${dog.name}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTE2Mjg4ODYsImV4cCI6MTcxMTk4ODg4Nn0.AzC0BLK8wUbzI4Db5-2QKbesggXP57cYZaq92WOpL-iZ63gOxRHU6-xF3XWMGbq6WZJW7iDwDG10oBoKo0lyCw',
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        return { ...dog, picture: url };
      })
      .catch(error => {
        console.error('Error fetching dog picture:', error);
        return dog;
      });
  };

  const fetchNextBatch = () => {
    setFetchCounter(prevCounter => prevCounter + 16);
  };

  useEffect(() => {
    if (fetchCounter > 0 && fetchCounter <= dogs.length) {
      const dogsToUpdate = dogs.slice(fetchCounter - 16, fetchCounter);
      const updatedDogsPromises = dogsToUpdate.map(dog => fetchDogPicture(dog));

      Promise.all(updatedDogsPromises).then(updatedDogsData => {
        const updatedDogs = dogs.map(dog => {
          const updatedDog = updatedDogsData.find(updatedDog => updatedDog.name === dog.name);
          return updatedDog ? updatedDog : dog;
        });
        setDogs(updatedDogs);
      });
    }
  }, [fetchCounter, colorHovered])

  const fetchedIndices: number[] = Array.from(Array(fetchCounter).keys());


  const fetchDogsByColor = (color: string) => {
    console.log(color);
    fetch(`http://localhost:8082/dog/alldogsbycoatcolor?color=${color}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTE2Mjg4ODYsImV4cCI6MTcxMTk4ODg4Nn0.AzC0BLK8wUbzI4Db5-2QKbesggXP57cYZaq92WOpL-iZ63gOxRHU6-xF3XWMGbq6WZJW7iDwDG10oBoKo0lyCw',
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        console.log(color);
        setDogs(data);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const handleFilteredByColor = (color: string) => {
    handleFilter("color");
    setFetchCounter(16);
    setSelectedColor(color);
    fetchDogsByColor(color);
  };

  return (
    <div className={styles.body}>

      <Navbar pagename="dogs" />
      <>
        <div>
          <div className={styles.container}>
            <div className={styles.filterContainer}>
              <button
                className={styles.filtered}
                onMouseEnter={() => setLetterHovered(true)}
                onMouseLeave={() => setLetterHovered(false)}

              >
                Letter
                {letterHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleSubFilter('a')}>a</li>
                    <li onClick={() => handleSubFilter('b')}>b</li>
                    <li onClick={() => handleSubFilter('c')}>c</li>
                  </ul>
                )}
              </button>

              <button
                className={`${styles.filtered} ${selectedFilter === 'Color' ? styles.active : ''}`}
                onMouseEnter={() => setColorHovered(true)}
                onMouseLeave={() => setColorHovered(false)}

              >
                Color
                {colorHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleFilteredByColor('black')}>black</li>
                    <li onClick={() => handleFilteredByColor('white')}>Blue</li>
                    <li onClick={() => handleFilteredByColor('chocolate')}>Green</li>
                  </ul>
                )}
              </button>

              <button
                className={styles.filtered}
                onMouseEnter={() => setLifespanHovered(true)}
                onMouseLeave={() => setLifespanHovered(false)}
              >
                Lifespan
                {lifespanHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleSubFilter('12')}>12 years</li>
                    <li onClick={() => handleSubFilter('14')}>15 years</li>
                    <li onClick={() => handleSubFilter('16')}>17 years</li>
                  </ul>
                )}
              </button>

              <button
                className={styles.filtered}
                onMouseEnter={() => setSizeHovered(true)}
                onMouseLeave={() => setSizeHovered(false)}
              >
                Size
                {sizeHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleSubFilter('Small')}>Small</li>
                    <li onClick={() => handleSubFilter('Medium')}>Medium</li>
                    <li onClick={() => handleSubFilter('Large')}>Large</li>
                  </ul>
                )}
              </button>
              <button
                className={styles.filtered}
                onMouseEnter={() => setCoatHovered(true)}
                onMouseLeave={() => setCoatHovered(false)}
              >
                Coat
                {coatHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleSubFilter('Europe')}>Europe</li>
                    <li onClick={() => handleSubFilter('Asia')}>Asia</li>
                    <li onClick={() => handleSubFilter('Africa')}>Africa</li>
                  </ul>
                )}
              </button>
            </div>
            <><ul className={styles.main_container}>
                {fetchedIndices.map(index => (
                  <button className={styles.bottom_dog} key={index}>
                    {dogs[index] && (
                      <>
                        <img src={dogs[index].picture} alt={dogs[index].name} className={styles.dog_picture} />
                        <div className={styles.name}>{dogs[index].name}</div>
                      </>
                    )}
                  </button>
                ))}
              </ul><button className={styles.next} onClick={fetchNextBatch}>
                  MORE
                </button></>
          </div>
        </div></>
    </div>
  );
};

export default AllDogs;

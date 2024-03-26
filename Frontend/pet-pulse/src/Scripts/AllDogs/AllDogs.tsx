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

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSubFilter = (subFilter: string) => {
    console.log('Selected sub-filter:', subFilter);
  };

  const [colorHovered, setColorHovered] = useState<boolean>(false);
  const [sizeHovered, setSizeHovered] = useState<boolean>(false);
  const [originHovered, setOriginHovered] = useState<boolean>(false);

  useEffect(() => {
    fetchAllDogs();
  }, []);

  const fetchAllDogs = () => {
    fetch('http://localhost:8082/dog/alldogs', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTEyMDAwMjYsImV4cCI6MTcxMTU2MDAyNn0.KSqQaxiEshvAnsoUayb0jLzr9ZxOScHMVGapKwlFHTkm6PdC76p1AwhgyQG1kCW_rk2E-C_9_CqVvkWV25FShw',
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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWEiLCJpYXQiOjE3MTEyMDAwMjYsImV4cCI6MTcxMTU2MDAyNn0.KSqQaxiEshvAnsoUayb0jLzr9ZxOScHMVGapKwlFHTkm6PdC76p1AwhgyQG1kCW_rk2E-C_9_CqVvkWV25FShw',
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
  }, [fetchCounter, dogs]);

  const fetchedIndices: number[] = Array.from(Array(fetchCounter).keys());

  return (
    <div className={styles.body}>

      <Navbar pagename="dogs" />
      <>
        <div>
          <div className={styles.container}>
            <div className={styles.filterContainer}>
              <button
                className={styles.filtered}
                onMouseEnter={() => setColorHovered(true)}
                onMouseLeave={() => setColorHovered(false)}
              >
                Color
                {colorHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleSubFilter('Red')}>Red</li>
                    <li onClick={() => handleSubFilter('Blue')}>Blue</li>
                    <li onClick={() => handleSubFilter('Green')}>Green</li>
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
                onMouseEnter={() => setOriginHovered(true)}
                onMouseLeave={() => setOriginHovered(false)}
              >
                Origin
                {originHovered && (
                  <ul className={styles.subFilterOptions}>
                    <li onClick={() => handleSubFilter('Europe')}>Europe</li>
                    <li onClick={() => handleSubFilter('Asia')}>Asia</li>
                    <li onClick={() => handleSubFilter('Africa')}>Africa</li>
                  </ul>
                )}
              </button>
            </div>
            <ul className={styles.main_container}>
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
            </ul>
            <button className={styles.next} onClick={fetchNextBatch}>
              Fetch Next Batch
            </button>
          </div>
        </div></>
    </div>
  );
};

export default AllDogs;

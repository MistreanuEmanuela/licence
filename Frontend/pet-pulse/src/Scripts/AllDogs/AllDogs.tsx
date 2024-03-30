import React, { useState, useEffect } from 'react';
import Logo from '../Logo/logo';
import styles from './AllDogs.module.css';
import Navbar from '../NavBars/NavBar';
import { useNavigate } from 'react-router-dom';


interface Dog {
  id: number;
  name: string;
  picture: string;
}
const token = localStorage.getItem("token");
console.log(token)

const AllDogs: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(16);
  const [last, setLast] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const history = useNavigate();



  const [colorHovered, setColorHovered] = useState<boolean>(false);
  const [sizeHovered, setSizeHovered] = useState<boolean>(false);
  const [coatHovered, setCoatHovered] = useState<boolean>(false);
  const [lifespanHovered, setLifespanHovered] = useState<boolean>(false);
  const [letterHovered, setLetterHovered] = useState<boolean>(false);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [selectedLifespan, setSelectedLifespan] = useState<number>(0);

  

  const fetchAllDogs = () => {
    fetch('http://localhost:8082/dog/alldogs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
        setLast(data.length <= 16);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  useEffect(() => {
    if (selectedFilter === '') {
     handleFetch();
    }
  }, [selectedFilter]);

  const fetchNextBatch = () => {
    if (dogs.length <= fetchCounter) {
      setLast(true);
    } else {
      setFetchCounter(prevCounter => prevCounter + 16);
    }
  };

  useEffect(() => {
    setShowLoading(false);
    if (fetchCounter >= dogs.length) {
      setFetchCounter(dogs.length);
    }
  }, [fetchCounter]);

  const fetchDogsByColor = (color: string) => {
    fetch(`http://localhost:8082/dog/alldogsbycoatcolor?color=${color}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
        setFetchCounter(16);
        setLast(data.length <= 16);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const fetchDogsByLetter = (letter: string) => {
    fetch(`http://localhost:8082/dog/alldogsbyname?letter=${letter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
        setFetchCounter(16);
        setLast(data.length <= 16);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const fetchDogsByLifespan = (years: number) => {
    fetch(`http://localhost:8082/dog/alldogsbylifespan?lifespan=${years}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
        setFetchCounter(16);
        setLast(data.length <= 16);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const fetchDogsBySize = (size: string) => {
    fetch(`http://localhost:8082/dog/alldogsbysize?size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
        setFetchCounter(16);
        setLast(data.length <= 16);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const fetchDogsByCoat = (coat: string) => {
    fetch(`http://localhost:8082/dog/alldogsbycoattype?coat=${coat}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: Dog[]) => {
        setDogs(data);
        setFetchCounter(16);
        setLast(data.length <= 16);
      })
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const handleFilteredByColor = (color: string) => {
    setSelectedFilter('color');
    setSelectedColor(color);
    fetchDogsByColor(color);
  };

  const handleFilteredByLetter = (letter: string) => {
    setSelectedFilter('letter');
    setSelectedLetter(letter);
    fetchDogsByLetter(letter);
  };

  const handleFilteredByLifespan = (lifespan: number) => {
    setSelectedFilter('lifespan');
    setSelectedLifespan(lifespan);
    fetchDogsByLifespan(lifespan);
  };

  const handleFilteredBySize = (size: string) => {
    setSelectedFilter('size');
    fetchDogsBySize(size);
  };

  const handleFilteredByCoat = (coat: string) => {
    setSelectedFilter('coat');
    fetchDogsByCoat(coat);
  };

  const handleFetch = () => {
    fetchDogsByCoat('');
    fetchAllDogs();
  };

  const handleSetId = (dogId: number) => {
    const dogIdString = String(dogId)
    localStorage.setItem("dogId", dogIdString);
    history('/dog');

  }

  return (
    <div className={styles.body}>
      <Navbar pagename="dogs" />
      <div className={styles.container}>
      <div className={styles.filterContainer}>
              <button
                className={styles.filtered}
                onMouseEnter={() => setLetterHovered(true)}
                onMouseLeave={() => setLetterHovered(false)}

              >
                Letter
                {letterHovered && (
                  <ul className={`${styles.subFilterOptions} ${styles.scrollableList}`}>
                    <li onClick={() => handleFilteredByLetter('a')}>a</li>
                    <li onClick={() => handleFilteredByLetter('b')}>b</li>
                    <li onClick={() => handleFilteredByLetter('c')}>c</li>
                    <li onClick={() => handleFilteredByLetter('d')}>d</li>
                    <li onClick={() => handleFilteredByLetter('e')}>e</li>
                    <li onClick={() => handleFilteredByLetter('f')}>f</li>
                    <li onClick={() => handleFilteredByLetter('g')}>g</li>
                    <li onClick={() => handleFilteredByLetter('h')}>h</li>
                    <li onClick={() => handleFilteredByLetter('j')}>j</li>
                    <li onClick={() => handleFilteredByLetter('k')}>k</li>
                    <li onClick={() => handleFilteredByLetter('l')}>l</li>
                    <li onClick={() => handleFilteredByLetter('m')}>m</li>
                    <li onClick={() => handleFilteredByLetter('n')}>n</li>
                    <li onClick={() => handleFilteredByLetter('o')}>o</li>
                    <li onClick={() => handleFilteredByLetter('p')}>p</li>
                    <li onClick={() => handleFilteredByLetter('q')}>q</li>
                    <li onClick={() => handleFilteredByLetter('s')}>s</li>
                    <li onClick={() => handleFilteredByLetter('t')}>t</li>
                    <li onClick={() => handleFilteredByLetter('u')}>u</li>
                    <li onClick={() => handleFilteredByLetter('v')}>v</li>
                    <li onClick={() => handleFilteredByLetter('x')}>x</li>
                    <li onClick={() => handleFilteredByLetter('y')}>y</li>
                    <li onClick={() => handleFilteredByLetter('z')}>z</li>
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
                    <li onClick={() => handleFilteredByLifespan(12)}>12 years</li>
                    <li onClick={() => handleFilteredByLifespan(14)}>15 years</li>
                    <li onClick={() => handleFilteredByLifespan(15)}>17 years</li>
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
                    <li onClick={() => handleFilteredBySize('small')}>Small</li>
                    <li onClick={() => handleFilteredBySize('medium')}>Medium</li>
                    <li onClick={() => handleFilteredBySize('large')}>Large</li>
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
                    <li onClick={() => handleFilteredByCoat('smooth')}>smooth</li>
                    <li onClick={() => handleFilteredByCoat('short')}>short</li>
                    <li onClick={() => handleFilteredByCoat('long')}>long</li>
                  </ul>
                )}
              </button>
              <button onClick={() => handleFetch()}> exit</button>
            </div>
        <ul className={styles.main_container}>
          {dogs.slice(0, fetchCounter).map((dog, index) => (
            <button className={styles.bottom_dog} key={index} onClick={() => handleSetId(dog.id)}>
              <img src={`./Dogs/${dog.name}.png`} alt={dog.name} className={styles.dog_picture} />
              <div className={styles.name}>{dog.name}</div>
            </button>
          ))}
        </ul>
        {!last && (
          <button className={styles.next} onClick={fetchNextBatch}>
            MORE
          </button>
        )}
      </div>
    </div>
  );
};

export default AllDogs;

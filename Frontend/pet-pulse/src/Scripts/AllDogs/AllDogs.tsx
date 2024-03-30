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

  const [selectedSize, setSelectedSize] = useState<String>('');
  const [selectedCoat, setSelectedCoat] = useState<String>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [selectedLifespan, setSelectedLifespan] = useState<number>(0);



  const fetchAllDogs = () => {
    setSelectedFilter('');
    setSelectedLetter('');
    setSelectedCoat('')
    setSelectedLifespan(0);
    setSelectedSize('');
    setSelectedFilter('');

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
    setSelectedLetter('');
    setSelectedCoat('')
    setSelectedLifespan(0);
    setSelectedSize('');
    setSelectedFilter('color');
    setSelectedColor(color);
    fetchDogsByColor(color);
  };

  const handleFilteredByLetter = (letter: string) => {
    setSelectedColor('');
    setSelectedCoat('')
    setSelectedLifespan(0);
    setSelectedSize('');
    setSelectedFilter('letter');
    setSelectedLetter(letter);
    fetchDogsByLetter(letter);
  };

  const handleFilteredByLifespan = (lifespan: number) => {
    setSelectedColor('');
    setSelectedCoat('')
    setSelectedLetter('');
    setSelectedSize('');
    setSelectedFilter('lifespan');
    setSelectedLifespan(lifespan);
    fetchDogsByLifespan(lifespan);
  };

  const handleFilteredBySize = (size: string) => {
    setSelectedColor('');
    setSelectedLifespan(0);
    setSelectedLetter('');
    setSelectedCoat('');
    setSelectedFilter('size');
    setSelectedSize(size)
    fetchDogsBySize(size);
  };

  const handleFilteredByCoat = (coat: string) => {
    setSelectedColor('');
    setSelectedLifespan(0);
    setSelectedLetter('');
    setSelectedSize('');
    setSelectedFilter('coat');
    fetchDogsByCoat(coat);
    setSelectedCoat(coat);
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
            className={`${styles.filtered} ${selectedFilter !== 'letter' ? styles.filtered : styles.filteredActive}`}

            onMouseEnter={() => setLetterHovered(true)}
            onMouseLeave={() => setLetterHovered(false)}

          >
            Letter
            {letterHovered && (
              <ul className={`${styles.subFilterOptions} ${styles.scrollableList}`}>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'a' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('a')}>a</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'b' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('b')}>b</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'c' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('c')}>c</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'd' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('d')}>d</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'e' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('e')}>e</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'f' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('f')}>f</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'g' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('g')}>g</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'h' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('h')}>h</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'i' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('i')}>i</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'j' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('j')}>j</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'k' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('k')}>k</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'l' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('l')}>l</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'm' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('m')}>m</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'n' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('n')}>n</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'o' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('o')}>o</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'p' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('p')}>p</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'q' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('q')}>q</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'r' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('r')}>r</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 's' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('s')}>s</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 't' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('t')}>t</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'u' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('u')}>u</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'v' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('v')}>v</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'w' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('w')}>w</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'x' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('x')}>x</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'y' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('y')}>y</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLetter !== 'z' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`} onClick={() => handleFilteredByLetter('z')}>z</li>
              </ul>
            )}
          </button>

          <button
            className={`${styles.filtered} ${selectedFilter !== 'color' ? styles.filtered : styles.filteredActive}`}
            onMouseEnter={() => setColorHovered(true)}
            onMouseLeave={() => setColorHovered(false)}

          >
            Color
            {colorHovered && (
              <ul className={styles.subFilterOptions}>
                <li className={`${styles.subFilterOptionsli} ${selectedColor !== 'black' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByColor('black')}>black</li>
                <li className={`${styles.subFilterOptionsli} ${selectedColor !== 'white' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByColor('white')}>White
                </li>
                <li className={`${styles.subFilterOptionsli} ${selectedColor !== 'chocolate' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByColor('chocolate')}>Chocolate</li>
              </ul>
            )}
          </button>

          <button
            className={`${styles.filtered} ${selectedFilter !== 'lifespan' ? styles.filtered : styles.filteredActive}`}
            onMouseEnter={() => setLifespanHovered(true)}
            onMouseLeave={() => setLifespanHovered(false)}

          >
            Lifespan
            {lifespanHovered && (
              <ul className={styles.subFilterOptions}>
                <li className={`${styles.subFilterOptionsli} ${selectedLifespan !== 12 ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByLifespan(12)}>12 years</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLifespan !== 14 ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByLifespan(14)}>14 years</li>
                <li className={`${styles.subFilterOptionsli} ${selectedLifespan !== 15 ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByLifespan(15)}>15 years</li>
              </ul>
            )}
          </button>

          <button
            className={`${styles.filtered} ${selectedFilter !== 'size' ? styles.filtered : styles.filteredActive}`}
            onMouseEnter={() => setSizeHovered(true)}
            onMouseLeave={() => setSizeHovered(false)}
          >
            Size
            {sizeHovered && (
              <ul className={styles.subFilterOptions}>
                <li className={`${styles.subFilterOptionsli} ${selectedSize !== 'small' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}

                  onClick={() => handleFilteredBySize('small')}>Small</li>
                <li className={`${styles.subFilterOptionsli} ${selectedSize !== 'medium' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}

                  onClick={() => handleFilteredBySize('medium')}>Medium</li>
                <li className={`${styles.subFilterOptionsli} ${selectedSize !== 'large' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}

                  onClick={() => handleFilteredBySize('large')}>Large</li>
              </ul>
            )}
          </button>
          <button
            className={`${styles.filtered} ${selectedFilter !== 'coat' ? styles.filtered : styles.filteredActive}`}

            onMouseEnter={() => setCoatHovered(true)}
            onMouseLeave={() => setCoatHovered(false)}
          >
            Coat
            {coatHovered && (
              <ul className={styles.subFilterOptions}>
                <li className={`${styles.subFilterOptionsli} ${selectedCoat !== 'smooth' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}

                  onClick={() => handleFilteredByCoat('smooth')}>smooth</li>
                <li className={`${styles.subFilterOptionsli} ${selectedCoat !== 'short' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}

                  onClick={() => handleFilteredByCoat('short')}>short</li>

                <li className={`${styles.subFilterOptionsli} ${selectedCoat !== 'long' ? styles.subFilterOptionsli : styles.subFilterOptionsliActive}`}
                  onClick={() => handleFilteredByCoat('long')}>long</li>
              </ul>
            )}
          </button>
          <button className= {styles.exit} onClick={() => handleFetch()}> </button>
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

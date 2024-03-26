import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './NavbarC.module.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (isSearchOpen) {
      const text = 'Search a dog or a cat bread';
      let index = -1;
      const intervalId = setInterval(() => {
        setPlaceholder((prevPlaceholder) => prevPlaceholder + text[index]);
        index++;
        if (index +1 === text.length) {
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    } else {
      setPlaceholder('');
    }
  }, [isSearchOpen]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.logo}>
        <Link to="/login" className={styles.logo_picture}></Link>
        <div className={styles.logo_text}> PetPulse</div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles['menu-icon']} onClick={toggleMenu}>
          <div>Menu</div>
        </div>
        <div className={styles.list}>
          <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
            <li><a href="./Home">Home</a></li>
            <li><a href="#">Dogs</a></li>
            <li><a href="#">Cats</a></li>
          </ul>
        </div>
      </nav>
      <div className={styles.default_buttoms}>
        {isSearchOpen && (
          <>
            <input
              type="text"
              placeholder={placeholder}
              className={styles.searchInput}
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <button className={styles.search_active} onClick={toggleSearch}></button>
          </>
        )}
        {!isSearchOpen && (
          <button className={styles.search} onClick={toggleSearch}></button>
        )}
        <button className={styles.pets}></button>
        <button className={styles.profile}></button>
      </div>
    </div>
  );
};

export default Navbar;

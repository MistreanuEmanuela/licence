import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './NavbarC.module.css';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  pagename: string;
}

const Navbar: React.FC<NavbarProps> = ({ pagename }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Search a dog');
  const history = useNavigate();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (isSearchOpen) {
      const text = 'Search a dog or a cat breed';
      let index = -1;
      const intervalId = setInterval(() => {
        setPlaceholder((prevPlaceholder) => prevPlaceholder + text[index]);
        index++;
        if (index + 1 === text.length) {
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

  const handleNavigate = () => {
    history('/myPets');
  };
  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    localStorage.setItem('search', searchValue);
    if (event.key === 'Enter') {
      history('/searchResults');

    }
  };

  return (
    <><div className={styles.body}>
      <div className={styles.logo}>
        <Link to="/principalPage" className={styles.logo_picture}></Link>
        <div className={styles.logo_text}> PetPulse</div>
      </div>
      <nav className={styles.navbar}>
        <div className={`${styles['menu-icon']} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div>Menu</div>
        </div>
        <div className={styles.list}>
          <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
            {pagename === 'home' && !isMenuOpen && (
              <div className={styles.home}>
                <div className={styles.page_home}></div>
                <li><a href="./principalPage">Home</a></li>
              </div>
            )}
            {(pagename !== 'home' || isMenuOpen) && (
              <li><a href="./principalPage">Home</a></li>
            )}
            {pagename === 'dogs' && !isMenuOpen && (
              <div className={styles.home}>
                <div className={styles.page_dog}></div>
                <li><a href="./alldog">Dogs</a></li>
              </div>
            )}
            {(pagename !== 'dogs' || isMenuOpen) && (
              <li><a href="./alldog">Dogs</a></li>
            )}
            {pagename === 'cats' && !isMenuOpen && (
              <div className={styles.home}>
                <div className={styles.page_cat}></div>
                <li><a href="./allcats">Cats</a></li>
              </div>
            )}
            {(pagename !== 'cats' || isMenuOpen) && (
              <li><a href="./allcats">Cats</a></li>
            )}
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
              onKeyDown={handleSearchKeyPress}
            />
            <button className={styles.search_active} onClick={toggleSearch}></button>
          </>
        )}
        {!isSearchOpen && (
          <button className={styles.search} onClick={toggleSearch}></button>
        )}
        <button className={styles.pets} onClick={handleNavigate}></button>
        <button className={styles.profile}></button>
      </div>
    </div>
      {isSearchOpen && (
        <><div className={styles.search_small_weight}>
          <input
            type="text"
            placeholder={placeholder}
            className={styles.searchInputSmall}
            value={searchValue}
            onChange={handleSearchInputChange} />
        </div></>
      )}
    </>
  );
};

export default Navbar;

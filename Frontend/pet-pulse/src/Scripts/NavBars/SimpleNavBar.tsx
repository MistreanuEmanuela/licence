import React, { useState } from 'react';
import styles from './NavBar.module.css'; 
import { Link } from 'react-router-dom'; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.body}> 
    <div className={styles.logo}>
        <Link to="/login" className={styles.logo_picture}>
        </Link>
        <div className={styles.logo_text}> PetPulse</div>
    </div>
    <nav className={styles.navbar}>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <div>Menu</div>
      </div>
      <div className={styles.list}> 
      <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
      <li><a href="./Home">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;

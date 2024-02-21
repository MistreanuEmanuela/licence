import React, { useState } from 'react';
import styles from './NavBar.module.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
        
      </div>
      <div className={styles.list}> 
      <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
        <li><a href="./Home">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
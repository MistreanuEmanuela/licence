import React, { useState } from 'react';
import styles from './NavBar.module.css'; // Import your CSS file for styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
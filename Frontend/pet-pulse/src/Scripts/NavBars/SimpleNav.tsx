import React, { useState } from 'react';
import styles from './Nav.module.css'; 
import { Link } from 'react-router-dom'; 

interface NavbarProps {
  pagename: string;
}

const Navbar: React.FC<NavbarProps> = ({ pagename }) => {
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
    <Link to="./login" className={styles.start}>Sign in</Link>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <div>Menu</div>
      </div>
      <div className={styles.list}> 
      <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.open : ''}`}>
      {pagename ==="home" &&
      (<>
          <li><a href="./help">Help</a></li>
          <li><a href="./about">About</a></li></>
      )
      }
      {pagename ==="help" && (
        <>
          <li><a href="./">Home</a></li>
          <li><a href="./about">About</a></li></>
        )
      }
        {pagename ==="about" &&(
          <>
          <li><a href="./help">Help</a></li>
          <li><a href="./">Home</a></li></>)
      }
      </ul>
    
      </div>
    </nav>
    </div>
  );
};

export default Navbar;

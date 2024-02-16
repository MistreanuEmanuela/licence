import React from 'react';
import styles from './logo.module.css'; 

function Logo({ size }) {
  const logoStyle = {
    width: size,
    height: '100%', 
  };

  return (
    <div className={styles.logo} style={logoStyle}>
      <div className={styles.logo_picture}> </div>
      <div className={styles.logo_text}>PetPulse</div>
    </div>
  );
}

export default Logo;
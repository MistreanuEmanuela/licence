import React from 'react';
import styles from './Body.module.css';

function LoginPage() {
  console.log("i am in thise page")
  return (
    <body className={styles.body}>
      <div className={styles.container}>
        Another
      </div>
    </body>
  );
}

export default LoginPage;
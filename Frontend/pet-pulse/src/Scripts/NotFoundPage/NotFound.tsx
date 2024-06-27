import React from 'react';
import styles from './NotFound.module.css';
import NotFoundPage from '../Components/Animations/NotFoundPage';

const NotFound = () => {
    return (
        <div className={styles.body}>
            <NotFoundPage />
        </div>
    );
}

export default NotFound;
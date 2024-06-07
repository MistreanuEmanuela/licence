import React from 'react';
import styles from './buttons.module.css';
import { Link } from 'react-router-dom';

const Buttons: React.FC = () => {
    return (
        <div className={styles.buttonsContainer}>
            <Link to='/Community' className={styles.button_comm}></Link>
            <Link to='/chatBot' className={styles.button_chat}></Link>
        </div>
    )
}

export default Buttons;
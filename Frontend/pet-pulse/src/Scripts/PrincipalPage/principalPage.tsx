import React from 'react';
import styles from './principalPage.module.css'
import Navbar from '../NavBars/NavBar';
import { Link } from 'react-router-dom';


const PrincipalPage = () => {
  return (
    <div className={styles.body}> 
    <Navbar pagename="home" />
    <div className={styles.find_pet_banner}> 
    <div className={styles.info}>
      <div className={styles.title}>Find your best match</div> 
      <div className={styles.content}> Finding the perfect furry (or not so furry) companion can be a delightful journey, but sometimes it's hard to decide which type of pet is the best fit for your lifestyle and preferences. That's where we come in! Take a moment to fill out our simple form below, and we'll provide you with a personalized pet suggestion tailored just for you. Whether you're a dog lover, a cat enthusiast, or considering something a bit more exotic, we're here to guide you on your path to pet parenthood.</div>
      <Link to="./formPage" className={styles.link}>Let's get started!</Link> 
      </div>
    <div className={styles.picture}></div>
    </div>
    </div>
  );
}

export default PrincipalPage;
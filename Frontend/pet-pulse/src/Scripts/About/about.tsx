import React from 'react';
import styles from './about.module.css';
import Navbar from '../NavBars/SimpleNav';
import { Link } from 'react-router-dom';


const About: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.nav}>
                <Navbar pagename='about'></Navbar>
            </div>
            <div className={styles.first_container}>
            </div>
            <div className={styles.second}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={styles.top_write}>
                        WHAT WE DO
                    </div>
                    <div className={styles.title}>
                        About PetPulse
                    </div>
                    <div className={styles.content}>
                    PetPulse is a comprehensive pet management application designed to help pet owners care for their furry friends with ease and efficiency. Our app provides a wide range of features including pet profile management, medical history tracking, and real-time health updates to ensure your pet receives the best care possible. Whether you're a first-time pet owner or a seasoned pet parent, PetPulse offers the tools you need to keep your pets healthy and happy.
                    </div>
                    <Link to="./login" className={styles.join}> Join us</Link>
                </div>
            </div>
            <div className={styles.third}>
                <div className={styles.left}>
                    <div className={styles.title}>Our vision</div>
                    <div className={styles.content}> At PetPulse, we offer comprehensive tools to manage your pet's needs, including detailed profiles, medical history tracking, and personalized care tips. Our advanced image recognition feature helps identify your pet's breed, while our chatbot provides real-time assistance for all your pet care queries. Explore our extensive repository of pet information and connect with other pet owners in our supportive community forum.</div>
                </div>
                <div className={styles.right}>
                    <div><div className={styles.firstPicture}></div> </div>
                   <div> <div className={styles.secondPicture}></div></div>
                </div>

            </div>

        </div>
    );
};

export default About;

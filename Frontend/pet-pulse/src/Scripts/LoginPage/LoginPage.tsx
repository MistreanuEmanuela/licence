import React, { useState } from 'react';
import styles from './Login.module.css';
import Navbar from '../NavBars/SimpleNavBar';
import Logo from '../Logo/logo';

interface Credentials {
  username: string;
  password: string;
}

interface FormContainerProps {
  onSubmit: (credentials: Credentials) => void;
}

function LeftContainer({ onSubmit }: FormContainerProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.left_container}>
      <div className={styles.logo}>
        <Logo size={"80%"} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_text}> Sing in to continue</div>
        <input 
          className={styles.input}
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <input 
          className={styles.input}
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className={styles.bottom}>Login</button>
        <button type="button" className={styles.forgot_pass_bottom}>Forgot your password?</button>
      </form>
    </div>
  );
}

function RightMainContainer() {
  return (
    <div className={styles.right_main_container}>
      <div className={styles.right_cloud_container}>
        <div className={styles.cloud_picture_container}>  </div>
          <button className={styles.inreg_bottom}>Create account</button>
      </div>
      <div className={styles.right_dog_container}></div>
    </div>
  );
}

function LoginPage() {
  const handleSubmit = async ({ username, password }: Credentials) => {
    const myHeaders: HeadersInit = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: string = JSON.stringify({
      "username": username,
      "password": password
    });
    
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:8082/users/connect", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.second_main_container}>
          <LeftContainer onSubmit={handleSubmit} />
          <RightMainContainer />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

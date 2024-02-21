import React, { useState } from 'react';
import styles from './Account.module.css';
import Navbar from '../NavBars/SimpleNavBar';
import Logo from '../Logo/logo';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  username: string;
}

const CreateAccount: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
    username: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleCreated = () => {
    const allElements = document.querySelectorAll<HTMLElement>('#add');
    allElements.forEach(element => {
        element.style.filter = 'blur(3px)';
      
    });
      const messageBox = document.createElement('div');
      messageBox.innerText = 'Your account has been created. Please validate your email.';
      messageBox.style.position = 'fixed';
      messageBox.style.top = '50%';
      messageBox.style.left = '50%';
      messageBox.style.transform = 'translate(-50%, -50%)';
      messageBox.style.backgroundColor = '#ffffff';
      messageBox.style.padding = '20px';
      messageBox.style.border = '2px solid #000000';
      messageBox.style.zIndex = '9999';
      messageBox.style.position= 'absolute';
      messageBox.style.filter = 'none';
      document.body.appendChild(messageBox);
  
    setTimeout(() => {
      messageBox.remove();
      allElements.forEach(element => {
        element.style.filter = 'none';
      });
    }, 10000);
  };
  
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (user.password !== confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(user), 
      redirect: "follow"
    };
    
    try {
      const response = await fetch("http://localhost:8082/users/create", requestOptions);
      const result = await response.text()
      setErrors([result])
      console.log(result)
      if (response.ok){
        handleCreated();
      }
      if (!response.ok) {
        throw new Error('Failed to create account');
      }
     
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <Logo size={"50%"}></Logo>
        <div className={styles.center}></div>
        <Navbar></Navbar>
      </div>
      <div className={styles.adaugare} id='add'>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.textBox}>
            SIGN IN
          </div>

          <input className={styles.input} type="text" placeholder="Enter Username" name="username" id="uname" value={user.username} onChange={handleChange} required />
          <input className={styles.input} type="email" placeholder="Enter E-mail" name="email" id="email" value={user.email} onChange={handleChange} required />
          <input className={styles.input} type="password" placeholder="Enter Password" name="password" id="password" value={user.password} onChange={handleChange} required />
          <input className={styles.input} type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <input className={styles.input} type="text" placeholder="Lastname" name="lastName" id="lastname" value={user.lastName} onChange={handleChange} required />
          <input className={styles.input} type="text" placeholder="Firstname" name="firstName" id="firstname" value={user.firstName} onChange={handleChange} required />
          <input className={styles.input} type="date" placeholder="Birthdate" name="birthDate" id="birthdate" value={user.birthDate} onChange={handleChange} required />

          <button className={styles.but} type="submit">Submit</button>
          {errors.length > 0 && (
            <div className={styles.error}>
              <ul>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;

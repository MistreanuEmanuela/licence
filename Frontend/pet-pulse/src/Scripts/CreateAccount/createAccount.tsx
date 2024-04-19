import React, { useState } from 'react';
import styles from './Account.module.css';
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import SendEmail from '../Components/Animations/send_email';


interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: string;
  username: string;
}

const CreateAccount: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const history = useNavigate();

  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthdate: '',
    username: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [created, setCreated] = useState<boolean>(false);

  const handleCreated = () => {
    const allElements = document.querySelectorAll<HTMLElement>('#add');
    allElements.forEach(element => {
      element.style.filter = 'blur(3px)';

    });
    setCreated(true);

    setTimeout(() => {
      setCreated(false);
       history('/')
    }, 5000);
   
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (user.password !== confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }
    if (user.email !== confirmEmail) {
      setErrors(['Emails do not match']);
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
      if (response.ok) {
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
       {
          created && (
            <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            <p>Account created successfully. Please check your email to activate your account. Redirecting...</p>
                            <SendEmail />
                        </div>
                    </div>
          )
        }
      <div className={styles.adaugare} id='add'>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.textBox}>
            Welcome!
          </div>
          {errors.length > 0 && (
            <div className={styles.error}>
              <ul>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.formInputs}>
            <div className={styles.part}>
              <div className={styles.input_box}>

                <input className={styles.input} type="email" placeholder="Enter E-mail" name="email" id="email" value={user.email} onChange={handleChange} required />
                <span className={styles.icon}> <MdEmail /></span></div>

              <div className={styles.input_box}>
                <input className={styles.input} type="email" placeholder="Confirm E-mail" name="email" id="email2" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
                <span className={styles.icon}><MdMarkEmailRead /></span></div>

              <div className={styles.input_box}>
                <input className={styles.input} type="password" placeholder="Enter Password" name="password" id="password" value={user.password} onChange={handleChange} required />
                <span className={styles.icon}><FaLock /></span></div>

              <div className={styles.input_box}>
                <input className={styles.input} type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <span className={styles.icon}><FaLock /></span></div>


            </div>
            <div className={styles.part}>
              <div className={styles.input_box}>
                <input className={styles.input} type="text" placeholder="Enter Username" name="username" id="uname" value={user.username} onChange={handleChange} required />
                <span className={styles.icon}> <FaUserAlt /></span></div>
                <div className={styles.input_box}>
                <input className={styles.input} type="text" placeholder="Lastname" name="lastName" id="lastname" value={user.lastName} onChange={handleChange} required />
                <span className={styles.icon}> <MdDriveFileRenameOutline /></span></div>
                <div className={styles.input_box}>

                <input className={styles.input} type="text" placeholder="Firstname" name="firstName" id="firstname" value={user.firstName} onChange={handleChange} required />
                <span className={styles.icon}> <MdDriveFileRenameOutline /></span></div>

              <input className={styles.input} type="date" placeholder="Birthdate" name="birthdate" id="birthdate" value={user.birthdate} onChange={handleChange} required />
            </div>
          </div>
          <button className={styles.but} type="submit">Submit</button>

        </form>
        <div className={styles.picture}></div>

      </div>
    </div>
  );
}

export default CreateAccount;

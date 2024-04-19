import React, { useEffect, useState } from 'react';
import styles from './login2.module.css';
import Navbar from '../NavBars/SimpleNavBar';
import Logo from '../Logo/logo';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import PasswordChange from '../Components/Animations/password_change';




interface Credentials {
  username: string;
  password: string;
}

interface FormProps {
  onSubmit: (credentials: Credentials) => void;
  errors: string[];
  onForgotPasswordClick: () => void;
}

const LoginForm: React.FC<FormProps> = ({ onSubmit, errors, onForgotPasswordClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
     <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Welcome back!</h1>

        {errors.length > 0 && (
          <div className={styles.error}>
            <ul>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.input_box}> 
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <span className={styles.icon}>
        <FaUser /></span>
        </div>
        
        <div  className={styles.input_box}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className={styles.icon}>
        <FaLock /></span>
</div>
        <div className={styles.forgot}>
        <a type="button" className={styles.forgot_pass_bottom} onClick={onForgotPasswordClick}> Forgot password?</a></div>
        <button type="submit" className={styles.login}>Login</button>
        <div className={styles.register}>
            <p>Don't have an account? <Link to="/sign" className={styles.register_button}>Register</Link></p>
        </div>
      </form>
    </div>
  );
}



const LoginPage: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const history = useNavigate();

  const handleConnect=(token: string) => {
      localStorage.setItem("token", token);
      console.log(token);
      setTimeout(() => {
        history('/principalPage');
    }, 500);
  }

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

    try{
      const response = await fetch("http://localhost:8082/users/connect", requestOptions)
      const result = await response.text()
      if (response.ok) {
        handleConnect(result);

      }
      if (!response.ok) {
        setErrors([result])
      }
    }catch (error) {
      console.error(error);
    }
  }
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordCancel = () => {
    setShowForgotPassword(false);
  };
  
  return (
    <div className={styles.body}>
   
      {showForgotPassword && (
        <ForgotPassword onCancel={handleForgotPasswordCancel} />
      )}

      <LoginForm onSubmit={handleSubmit} errors={errors} onForgotPasswordClick={handleForgotPasswordClick} />
    </div>
  );
}

interface ForgotPasswordProps {
  onCancel: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onCancel }) => {
  const [email, setEmail] = useState('');
  const [messageBoxErrors, setMessageBoxErrors] = useState<string[]>([]);
  const [isEmailOk, setIsEmailOk] =useState<boolean>(); 

  const handleSendEmail = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: string = JSON.stringify({
      "email": email
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8082/users/forgotPassword", requestOptions)
      .then((response) => response.text())
      .then((result) => {setMessageBoxErrors([result])
      console.log(result)
      if(result)
    {
      setIsEmailOk(false)
    }
      else{
       setIsEmailOk(true)
      }
  }
      )
      .catch((error) => console.error(error));

  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.forgot_password_container}>
      <div className={styles.message_box}>
      <div className={styles.botton_cancel} onClick={handleCancel}><MdCancel /></div>
      <img  src='./DesignPicture/step1.png' alt='not found' className={styles.steps}></img>
        <div className={styles.error}>
          {messageBoxErrors[0] && <div>{messageBoxErrors[0]}</div>}
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.bottoms_container}>
          <div className={styles.botton_send} onClick={handleSendEmail}><div className={styles.send_icon}> <IoIosSend /></div>Send</div>
        </div>
      </div>
      {isEmailOk === true ? <ValidateCode onCancel={handleCancel} email={email} /> : null}
    </div>
    
  );
};


interface ValidateCode {
  onCancel: () => void;
  email: String
}

const ValidateCode: React.FC<ValidateCode> = ({ onCancel, email }) => {
  const [code, setCode] = useState('');
  const [messageBoxErrors, setMessageBoxErrors] = useState<string[]>([]);
  const [isCodeOk, setIsCodeOk] =useState<boolean>(); 


  const handleSendCode = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(email)
    console.log(code)
    const raw = JSON.stringify({
      "email": email,
      "code": code
    });

    console.log(raw)
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8082/users/codeForgotPassword", requestOptions)
    .then((response) => response.text())
    .then((result) => {setMessageBoxErrors([result])
      console.log(result)
      if(result)
    {
      setIsCodeOk(false)
    }
      else{
       setIsCodeOk(true)
      }
  }
      )    .catch((error) => console.error(error));
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.forgot_password_container}>
      <div className={styles.message_box}>
      <div className={styles.botton_cancel} onClick={handleCancel}><MdCancel /></div>
      <img  src='./DesignPicture/step2.png' alt='not found' className={styles.steps}></img>
        <div className={styles.error}>
          {messageBoxErrors[0] && <div>{messageBoxErrors[0]}</div>}
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <div className={styles.bottoms_container}>
          <div className={styles.botton_send} onClick={handleSendCode}><div className={styles.send_icon}> <IoIosSend /></div> Send</div>
       
        </div>
      </div>
      {isCodeOk=== true ? <ChangePassword onCancel={handleCancel} email={email} /> : null}
    </div>
  );
};

interface ChangePassword {
  onCancel: () => void;
  email: String
}

const ChangePassword: React.FC<ValidateCode> = ({ onCancel, email }) => {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [messageBoxErrors, setMessageBoxErrors] = useState<string[]>([]);
  const [isPasswordOk, setIsPasswordOk] =useState<boolean>(); 


  const handleSendNewPassword = () => {
    if(password != confPassword || password==null){
      setMessageBoxErrors(["The password do not match"])
    }
    else{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(email)
    console.log(password)
    const raw = JSON.stringify({
      "email": email,
      "newPassword": password
    });

    console.log(raw)
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8082/users/changePassword", requestOptions)
    .then((response) => response.text())
    .then((result) => {setMessageBoxErrors([result])
      console.log(result)
      if(result)
    {
      setIsPasswordOk(false)
    }
      else{
       setIsPasswordOk(true)
      }
  }
      ).catch((error) => console.error(error));
}
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.forgot_password_container}>
      <div className={styles.message_box}>
      <div className={styles.botton_cancel} onClick={handleCancel}><MdCancel /></div>
      <img  src='./DesignPicture/step3.png' alt='not found' className={styles.steps}></img>

        <div className={styles.error}>
          {messageBoxErrors[0] && <div>{messageBoxErrors[0]}</div>}
        </div>
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <input
          className={styles.input}
          type="password"
          placeholder="confirm password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required
        />
        <div className={styles.bottoms_container}>
          <div className={styles.botton_send} onClick={handleSendNewPassword}><div className={styles.send_icon}> <IoIosSend /></div> Send</div>
        </div>
      </div>
      {isPasswordOk=== true ? <ChangeSuccessful onCancel={handleCancel}/> : null}
      

    </div>
  );
};


interface ChangeSuccessful {
  onCancel: () => void;
}
const ChangeSuccessful: React.FC<ChangeSuccessful> = ({onCancel}) => {
  const [isVisible, setIsVisible] = useState<boolean>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      handleCancel();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      {isVisible && (
        <div className={styles.forgot_password_container}>
          <div className={styles.message_box}>
            The password has been updated successfully!
            <PasswordChange/>
          </div>
        </div>
      )}
    </>
  );
};



export default LoginPage;

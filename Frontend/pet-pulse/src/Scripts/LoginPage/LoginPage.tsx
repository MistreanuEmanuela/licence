import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import Navbar from '../NavBars/SimpleNavBar';
import Logo from '../Logo/logo';
import { Link } from 'react-router-dom';

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
    <div className={styles.left_container}>
      <div className={styles.logo}>
        <Logo size={"80%"} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_text}> Sign in to continue</div>

        {errors.length > 0 && (
          <div className={styles.error}>
            <ul>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </ul>
          </div>
        )}
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
        <button type="button" className={styles.forgot_pass_bottom} onClick={onForgotPasswordClick}> Forgot your password?</button>
      </form>
    </div>
  );
}

function RightMainContainer() {
  return (
    <div className={styles.right_main_container}>
      <div className={styles.right_cloud_container}>
        <div className={styles.cloud_picture_container}>  </div>
        <Link className={styles.inreg_bottom} to='../sign'> Create account </Link>
      </div>
      <div className={styles.right_dog_container}></div>
    </div>
  );
}

const LoginPage: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
      .then((result) => setErrors([result]))
      .catch((error) => console.error(error));
  }

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordCancel = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className={styles.body}>
      {!showForgotPassword ? (

        <div className={`${styles.container} ${showForgotPassword ? styles.container_blur : ''}`} id='main_container'>
          <Navbar />
          <div className={styles.second_main_container}>
            <LoginForm onSubmit={handleSubmit} errors={errors} onForgotPasswordClick={handleForgotPasswordClick} />
            <RightMainContainer />
          </div>
        </div>

      ) : (
        <><div className={`${styles.container} ${showForgotPassword ? styles.container_blur : ''}`} id='main_container'>
            <Navbar />
            <div className={styles.second_main_container}>
              <LoginForm onSubmit={handleSubmit} errors={errors} onForgotPasswordClick={handleForgotPasswordClick} />
              <RightMainContainer />
            </div>
          </div><ForgotPassword onCancel={handleForgotPasswordCancel} /></>
      )}
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
    myHeaders.append("Content-Type", "text/plain");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: email,
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
          <div className={styles.bottom_send} onClick={handleSendEmail}>Send</div>
          <div className={styles.bottom_cancel} onClick={handleCancel}>Cancel</div>
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
          <div className={styles.bottom_send} onClick={handleSendCode}>Send</div>
          <div className={styles.bottom_cancel} onClick={handleCancel}>Cancel</div>
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
          <div className={styles.bottom_send} onClick={handleSendNewPassword}>Send</div>
          <div className={styles.bottom_cancel} onClick={handleCancel}>Cancel</div>
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
  const [isVisible, setIsVisible] = useState(true);

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
          </div>
        </div>
      )}
    </>
  );
};



export default LoginPage;

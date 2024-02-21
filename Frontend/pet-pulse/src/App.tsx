import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './Scripts/MainPage/MainPage';
import LoginPage from './Scripts/LoginPage/LoginPage';
import CreateAccount from './Scripts/CreateAccount/createAccount';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/login" element={<LoginPage/>}> </Route>
        <Route path="/sign" element={<CreateAccount/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
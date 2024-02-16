import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './Scripts/MainPage/MainPage';
import LoginPage from './Scripts/LoginPage/LoginPage';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/login" element={<LoginPage/>}> </Route>
      </Routes>
    </Router>
  );
}

export default App;
import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './Scripts/MainPage/MainPage';
import LoginPage from './Scripts/LoginPage/LoginPage';
import CreateAccount from './Scripts/CreateAccount/createAccount';
import DogInfo from './Scripts/DogInfo/dogInfo';
import AllDogs from './Scripts/AllDogs/AllDogs';
import PrincipalPage from './Scripts/PrincipalPage/principalPage';
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/login" element={<LoginPage/>}> </Route>
        <Route path="/sign" element={<CreateAccount/>}></Route>
        <Route path="/dog" element={<DogInfo/>}></Route>
        <Route path="/alldog" element={<AllDogs/>}></Route>
        <Route path="/principalPage" element={<PrincipalPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
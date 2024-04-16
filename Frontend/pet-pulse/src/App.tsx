import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './Scripts/MainPage/MainPage';
import LoginPage from './Scripts/LoginPage/Login';
import CreateAccount from './Scripts/CreateAccount/createAccount';
import DogInfo from './Scripts/DogInfo/dogInfo';
import AllDogs from './Scripts/AllDogs/AllDogs';
import PrincipalPage from './Scripts/PrincipalPage/principalPage';
import AllCats from './Scripts/AllCats/AllCats';
import CatInfo from './Scripts/CatInfo/catInfo';
import AddPet from './Scripts/AddPet/AddPet';
import AllMyPets from './Scripts/AllMyPets/MyPet'
import PetInfo from './Scripts/PetInfo/petInfo';
import AddMedicalHistory from './Scripts/AddMedicalHistory/AddMedicalHistory';
import MedicalHistory from './Scripts/MedicalHistory/MedicalHistory';


function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/login" element={<LoginPage/>}> </Route>
        <Route path="/sign" element={<CreateAccount/>}></Route>
        <Route path="/dog" element={<DogInfo/>}></Route>
        <Route path="/cat" element={<CatInfo/>}></Route>
        <Route path="/alldog" element={<AllDogs/>}></Route>
        <Route path="/principalPage" element={<PrincipalPage/>}></Route>
        <Route path="/allcats" element={<AllCats/>}></Route>
        <Route path="/addPet" element={<AddPet/>}></Route>
        <Route path ="/myPets" element={<AllMyPets/>}></Route>
        <Route path ="/petInfo" element={<PetInfo/>}></Route>
        <Route path ="/medicalHistory" element={<AddMedicalHistory/>}></Route>
        <Route path ="/viewMedicalHistory" element={<MedicalHistory/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
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
import MedicalHistoryInfo from './Scripts/MedicalHistoryInfo/MedicalHistoryInfo';
import Search from './Scripts/SearchResult/search';
import Profile from './Scripts/Profile/profile'
import Community from './Scripts/CommunityPosts/community';
import BreedRecognition from './Scripts/BreedRecognition/breedRecognition';
import PetFind from './Scripts/BestPetFind/PetFind';
import ChatBot from './Scripts/ChatBotPage/ChatBot';
import Help from './Scripts/Help/help';
import About from './Scripts/About/about';

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
        <Route path ="/medicalHistoryInfo" element={<MedicalHistoryInfo/>}></Route>
        <Route path ="/searchResults" element={<Search/>}></Route>
        <Route path ="/profile" element={<Profile/>}></Route>
        <Route path ="/community" element={<Community/>}></Route>
        <Route path='/breedRecognition' element={<BreedRecognition/>}></Route>
        <Route path ='/findPet'  element={<PetFind/>}></Route>
        <Route path ='/chatbot'  element={<ChatBot/>}></Route>
        <Route path ='/help'  element={<Help/>}></Route>
        <Route path ='/about'  element={<About/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
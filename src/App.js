import "./fonts/DMM.ttf"
import './App.css';
import { Routes,Route } from 'react-router-dom';

import Room from "./room/room";
import TeamWork from "./team/TeamWork";
import Aviral from "./team/Aviral";
import Benjamin from "./team/Benjamin";
import Lakshay from "./team/Lakshay";
import Kartikey from "./team/Kartikey";
import SignUpPage from "./login/SignupPage";
import UserHome from "./user/UserHome";
import Profile from "./user/MoodTracker";
import Mood from "./user/Mood";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeamWork/>}   />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/test/Lakshay" element={<Lakshay />} />
        <Route path="/test/Benjamin" element={<Benjamin />} />
        <Route path="/test/Kartikey" element={<Kartikey />} />
        <Route path="/test/Aviral" element={<Aviral />} />
        <Route path="/room" element={<Room/>}   />
        <Route path="/user/home" element={<UserHome/>}   />
        <Route path="/mood" element={<Mood/>}   />
        <Route path="/user/mood" element={<Profile/>}   />
      </Routes>
    </div>
  );
}

export default App;

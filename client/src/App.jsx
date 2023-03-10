import React, {useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import MangaList from './components/MangaList';
import Auth from './components/Auth';
import { useNavigate } from 'react-router-dom';
import Profile from './components/Profile'; 
import CreateManga from './components/Createmanga';
import MangaImages from './components/MangaImages';
import Suggestions from './components/Suggestions';

import AddManga from './components/AddManga';
import AuthContextProvider from '../context/AuthContext';

function App() {
  // const name = "John Doe";
  // const email = "john.doe@example.com";

  const [user, setUser] = useState({ isLoggedIn: false, name:null, email: null });

  const navigate = useNavigate();

  const handleLoginSuccess = (token, name, email) => {
    localStorage.setItem("token", token);
    setUser({ isLoggedIn: true, name:name, email:email });
    console.log(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ isLoggedIn: false, name:null, email: null });
    navigate('/login');
  };


  return (
    <div>
      <nav>
        <Link to="/login">Home</Link> |{" "}
        <Link to="/mangas">Manga List</Link> |{" "}
        <button onClick={handleLogout} to="/login">Logout</button> |{" "}
        <Link to="/profile">User Profile</Link>
      </nav>
      <Routes>
          <Route exact path="/login" 
          element={<Auth onLoginSuccess={handleLoginSuccess} setUser={setUser}/>}/>
          
          <Route exact path="mangas" 
            element={<MangaList/>} />

          <Route path="/manga/:title" element={<MangaImages />} />

          
          <Route exact path="/profile" 
          element={<Profile user={user}
          />} />

          <Route path="/create" element={<CreateManga/>} />
           
      </Routes>
    </div>
  );
}

export default App;



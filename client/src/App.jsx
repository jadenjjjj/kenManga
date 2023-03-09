import React, {useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import MangaList from './components/MangaList';
import Auth from './components/Auth';
import { useNavigate } from 'react-router-dom';
import AddManga from './components/AddManga';
import AuthContextProvider from '../context/AuthContext';

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, email: null });

  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setUser({ isLoggedIn: true, email:email });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ isLoggedIn: false, email: null });
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
          element={<Auth/>} onLoginSuccess={handleLoginSuccess}/>
          
          <Route exact path="mangas" 
            element={<MangaList/>} user={user}/>
          
          <Route exact path="/profile" 
            element={<div><p>Username: {user.name}</p><p>Email: {user.email}</p><p>Token: {localStorage.getItem("token")}</p><p>Password: ********</p></div>}/>
           
      </Routes>
    </div>
  );
}

export default App;



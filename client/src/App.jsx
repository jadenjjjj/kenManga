import React from 'react';
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import MangaList from './components/MangaList';
import Auth from './components/Auth';
import AddManga from './components/AddManga';
import AuthContextProvider from '../context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/add-manga" element={<AddManga />} />
          <Route path="/mangas" element={<MangaList />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;



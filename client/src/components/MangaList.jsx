import React, { useState, useEffect } from "react";
import { getItems } from "../../api";
import { Link } from 'react-router-dom';
import MangaImages from './MangaImages';
import './Mangalist.css';

const MangaList = ({ user }) => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const data = await getItems(token);
        setMangaList(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Manga List</h2>
      <div className="row">
        {mangaList.map((manga) => (
          <div className="col-md-3" key={manga._id}>
            <div className="card">
              <img src={manga.coverImage} alt={manga.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{manga.title}</h5>
                <p className="card-text">Author: {manga.author}</p>
                <p className="card-text">Genre: {manga.genre}</p>
                <p className="card-text">Status: {manga.status}</p>
                <p className="card-text">Rating: {manga.rating}</p>
                <Link to={`/manga/${manga.title}`} className="btn btn-primary">View Images</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaList;


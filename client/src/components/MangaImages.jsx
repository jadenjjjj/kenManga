import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MangaImages() {
  const [mangaInfo, setMangaInfo] = useState(null);
  const { title } = useParams();

  useEffect(() => {
    const fetchMangaInfo = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/118/characters`);
        console.log("response: ",response.data);
        const anime = response.data.results[0];
        console.log("anime: " + anime)
        setMangaInfo(anime);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMangaInfo();
  }, [title]);

  return (
    <div>
      {mangaInfo ? (
        <div>
          <h2>{mangaInfo.title}</h2>
          <p>Synopsis: {mangaInfo.synopsis}</p>
          <p>Type: {mangaInfo.type}</p>
          <p>Status: {mangaInfo.status}</p>
          <p>Start Date: {mangaInfo.start_date}</p>
          <p>End Date: {mangaInfo.end_date}</p>
          <p>Rating: {mangaInfo.rating}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MangaImages;






import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MangaImages({ match }) {
  const [images, setImages] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const fetchMangaImages = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}&sfw`);
        const anime = response.data.data[0];
        if (anime && anime.endpoint) {
          const response = await axios.get(`https://api.jikan.moe/v4${anime.endpoint}/pictures`);
          setImages(response.data.pictures);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMangaImages();
  }, [title]);

  return (
    <div>
      {images.length === 0 ?
        <p>No images found.</p> :
        images.map((image) => (
          <img key={image.large} src={image.large} alt="" />
        ))
      }
    </div>
  );
  
}

export default MangaImages;

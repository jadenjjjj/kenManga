import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

export const getItems = async (token) => {
  const response = await axios.get('/api/mangas', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};



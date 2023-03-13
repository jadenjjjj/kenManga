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

export const getSuggestions = async (token) => {
  const response = await axios.get('/api/suggestions', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
} 

export const deleteItem = async (token, type, id) => {
  const response = await axios.delete(`/api/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export const addItem = async (token, type, itemData) => {
  const response = await axios.post(`/api/${type}`, itemData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  } );
  return response.data;
}

export const updateItem = async (token, type, id, data) => {
  const response = await axios.put(`/api/${type}/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}
// export default {
//   getItems,
//   getSuggestions,
// }



import { useState } from 'react';
import axios from 'axios';
import './Createmanga.css';

function CreateManga() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    status: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { title, author, genre, status, description } = formData;
  
    // validate form data
    if (!title || !author || !genre || !status || !description) {
      console.log('Please fill in all required fields');
      return;
    }
    
    console.log('Form data:', formData);

    try {
      const response = await axios.post('http://localhost:4000/api/create', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // do something with the response data, such as redirecting to a success page
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        author:
        <input type="text" name="author" value={formData.author} onChange={handleChange} />
      </label>
      <label>
        genre:
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
      </label>
      <label>
        status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateManga;

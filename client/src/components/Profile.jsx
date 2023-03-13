import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import * as api from '/api.js';


function Profile(props) {
  const [suggestions, setSuggestions] = useState([]);
  // const {user} = props.location.state; 
  // const { user } = props;


  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const data = await api.getSuggestions(token);
        setSuggestions(data);
      } catch(error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  console.log(props.name, props.email);


  return (
    <div className="container">
      <div className="card">
        <h1 className="text-center">Profile</h1>
        <p>Name: {props.user.name}</p>
        <p>Email: {props.user.email}</p>
        <p>Password: ********</p>
        <Link to="/create">
          <button>Create</button>
        </Link>
        <Link to={{ pathname: '/suggestions', state: {user: props.user} }}>
          <button>Suggestions</button>
        </Link>

      </div>
    </div>
  );
}

export default Profile;


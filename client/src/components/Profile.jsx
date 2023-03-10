import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {
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
      </div>
    </div>
  );
}

export default Profile;


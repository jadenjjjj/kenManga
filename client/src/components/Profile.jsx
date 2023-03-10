import React from 'react';
import { Link } from 'react-router-dom';

function Profile(props) {
  console.log(props.name, props.email);
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {props.user.name}</p>
      <p>Email: {props.user.email}</p>
      <p>Password: ********</p>
      <Link to="/create">
        <button>Create</button>
      </Link>
    </div>
  );
}

export default Profile;


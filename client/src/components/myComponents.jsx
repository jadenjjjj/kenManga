import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/getMessage')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.log(error));
  }, []);

  console.log(message);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default MyComponent;



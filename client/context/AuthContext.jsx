import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Add logic here to check if the user is logged in and set the isLoggedIn and userData state accordingly
  }, []);

  const login = (email, password) => {
    // Add logic here to authenticate the user and set the isLoggedIn and userData state accordingly
  };

  const logout = () => {
    // Add logic here to log the user out and set the isLoggedIn and userData state accordingly
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

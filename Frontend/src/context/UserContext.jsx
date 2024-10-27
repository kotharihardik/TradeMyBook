import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // Parse and set user or return null
  });

  const signup = async (email, password, name, bio, location) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', { email, password, name, bio, location });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data)); // Save user to local storage
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      const userData = { uid: response.data.uid, token: response.data.token };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Save user to local storage
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from local storage on logout
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

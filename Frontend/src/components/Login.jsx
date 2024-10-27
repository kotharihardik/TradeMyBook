import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useUserContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password).then(() => {
      navigate('/'); // Redirect to homepage after login
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-2 mb-2 w-full text-black"
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          className="p-2 mb-4 w-full text-black"
        />
        <button type="submit" className="bg-primary text-white p-2 rounded w-full">Login</button>
        <p className="mt-4">Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;

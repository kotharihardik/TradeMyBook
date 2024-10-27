import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useUserContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    bio: '',
    location: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.email, formData.password, formData.name, formData.bio, formData.location)
      .then(() => {
        navigate('/login'); // Redirect to login after signup
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="p-2 mb-2 w-full text-black"
        />
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
          className="p-2 mb-2 w-full text-black"
        />
        <input
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="p-2 mb-2 w-full text-black"
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 mb-4 w-full text-black"
        />
        <button type="submit" className="bg-primary text-white p-2 rounded w-full">Sign Up</button>
        <p className="mt-4">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;

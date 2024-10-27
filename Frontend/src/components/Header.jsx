// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {
  return (



<header class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <div class="flex items-center space-x-3">
      <img src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/64/ffffff/external-book-bookstore-smashingstocks-detailed-outline-smashing-stocks.png" alt="Logo" class="h-10 w-10"/>
      <h1 class="text-3xl font-bold tracking-wide">Book Exchange</h1>
    </div>
    <nav class="hidden md:flex space-x-6">
      <a href="/" class="hover:bg-purple-700 hover:text-white px-4 py-2 rounded-md transition duration-300 transform hover:scale-105">Home</a>
      <a href="/browse" class="hover:bg-purple-700 hover:text-white px-4 py-2 rounded-md transition duration-300 transform hover:scale-105">Browse Books</a>
      <a href="/aboutus" class="hover:bg-purple-700 hover:text-white px-4 py-2 rounded-md transition duration-300 transform hover:scale-105">About Us</a>
      <a href="/contactus" class="hover:bg-purple-700 hover:text-white px-4 py-2 rounded-md transition duration-300 transform hover:scale-105">Contact Us</a>
      <a href="#" class="hover:bg-white hover:text-purple-600 text-white bg-purple-500 rounded-full px-5 py-2 font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">Logout</a>
    </nav>
    <button class="md:hidden text-white focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </div>
</header>

    

  );
};

export default Header;

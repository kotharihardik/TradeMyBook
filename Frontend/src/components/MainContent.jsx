// src/MainContent.jsx
import React from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import UserRequests from './components/UserRequests'; // Import UserRequests component



const MainContent = () => {

  const navigate = useNavigate();

  return (
    <main class="bg-white min-h-screen py-12">
      <div class="container mx-auto px-6">

        <div className="flex justify-center mb-8 space-x-4">
          const navigate = useNavigate();
          <button
            onClick={() => navigate('/receiving-requests')} // Replace with your desired route
            className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            Receiving Requests
          </button>

          <button
            onClick={() => navigate('/my-requests')} // Replace with your desired route
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            My Requests
          </button>

          <button
            onClick={() => navigate('/list')} // Replace with your desired route
            className="bg-gradient-to-r from-teal-600 to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
          >
            Add Listing
          </button>
        </div>




        <div class="flex justify-center mb-10">
          <input type="text" placeholder="Search for books..." class="w-full max-w-3xl px-6 py-3 text-gray-700 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 transform focus:shadow-xl focus:scale-105" />
        </div>


        <section class="text-center bg-white rounded-lg p-8 mb-12">
          <h2 class="text-4xl font-extrabold text-purple-700 mb-6">Explore New Books & Share Your Collection!</h2>
          <p class="text-lg text-gray-600 mb-10">Discover new reads, exchange books, and be a part of our growing community of book enthusiasts.</p>
          <a href="/browse" class="inline-block px-8 py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110">Browse Collection</a>
        </section>


        <section class="mb-12">
          <h3 class="text-3xl font-bold text-gray-800 mb-6">Featured Books</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-5">
              <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" alt="Book Cover" class="rounded-t-lg h-64 w-full object-cover mb-4" />
              <h4 class="text-xl font-semibold mb-2">The Great Gatsby</h4>
              <p class="text-gray-600">A classic novel by F. Scott Fitzgerald.</p>
              <button class="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300">
                Request Exchange
              </button>
            </div>

            <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-5">
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Book Cover" class="rounded-t-lg h-64 w-full object-cover mb-4" />
              <h4 class="text-xl font-semibold mb-2">To Kill a Mockingbird</h4>
              <p class="text-gray-600">A story of racial injustice by Harper Lee.</p>
              <button class="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300">
                Request Exchange
              </button>
            </div>

            <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-5">
              <img src="https://images.unsplash.com/photo-1532012197276-a07f4a4885bf" alt="Book Cover" class="rounded-t-lg h-64 w-full object-cover mb-4" />
              <h4 class="text-xl font-semibold mb-2">1984</h4>
              <p class="text-gray-600">A dystopian novel by George Orwell.</p>
              <button class="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300">
                Request Exchange
              </button>
            </div>
          </div>
        </section>


        <section class="bg-purple-50 py-10 rounded-lg shadow-lg mb-12">
          <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Users Say</h3>
          <div class="flex flex-col md:flex-row items-center justify-around gap-8">
            <div class="max-w-md p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <p class="text-gray-600 mb-4">"This platform is amazing. I've found rare books here and connected with many book lovers!"</p>
              <h4 class="font-semibold text-lg text-purple-700">- Emily Clarke</h4>
            </div>
            <div class="max-w-md p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <p class="text-gray-600 mb-4">"Easy to use, great community, and a fantastic way to explore new genres."</p>
              <h4 class="font-semibold text-lg text-purple-700">- Michael Smith</h4>
            </div>
            <div class="max-w-md p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <p class="text-gray-600 mb-4">"I have exchanged more than 20 books here. The platform is very user-friendly."</p>
              <h4 class="font-semibold text-lg text-purple-700">- Sarah Johnson</h4>
            </div>
          </div>
        </section>
      </div>
    </main>




  );
};

export default MainContent;

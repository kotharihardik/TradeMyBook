// src/components/BookManager.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useUserContext } from "../context/UserContext";

const BookManager = () => {

  const { user } = useUserContext(); // Access user from context
  const userId = user ? user.uid : null; // Get userId if user is logged in

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    condition: "",
    category: "",
    photos: [],
    location: "",
  });

  // Fetch books for the specific user
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log(userId);
        const response = await axios.get(`http://localhost:4000/api/books/user/${userId}`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userId);
      await axios.post('http://localhost:4000/api/books/add', { userId, ...newBook });
      setBooks((prev) => [...prev, { ...newBook, userId }]);
      setNewBook({
        title: "",
        author: "",
        description: "",
        condition: "",
        category: "",
        photos: [],
        location: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/delete/${userId}/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Your Books</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="border border-gray-300 rounded-lg p-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="border border-gray-300 rounded-lg p-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <textarea
            name="description"
            value={newBook.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border border-gray-300 rounded-lg p-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <input
            type="text"
            name="condition"
            value={newBook.condition}
            onChange={handleChange}
            placeholder="Condition (e.g., New, Used)"
            required
            className="border border-gray-300 rounded-lg p-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <input
            type="text"
            name="category"
            value={newBook.category}
            onChange={handleChange}
            placeholder="Category (e.g., Fiction, Non-Fiction)"
            required
            className="border border-gray-300 rounded-lg p-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <input
            type="text"
            name="location"
            value={newBook.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="border border-gray-300 rounded-lg p-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>
        <button type="submit" className="mt-4 bg-purple-600 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 w-full">
          Add Book
        </button>
      </form>

      <ul className="bg-white shadow-md rounded-lg p-4">
        {books.map((book) => (
          <li key={book.id} className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
            <span className="text-gray-700">{book.title} by {book.author}</span>
            <button
              onClick={() => handleDelete(book.id)}
              className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookManager;

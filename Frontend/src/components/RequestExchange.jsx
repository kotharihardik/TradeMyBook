// src/components/RequestExchange.jsx
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const RequestExchange = ({ requestedBook ,ownerId}) => {
  const { user } = useUserContext();
  const [offeredBooks, setOfferedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  // Fetch user's offered books
  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/books/user/${user.uid}`);
        setOfferedBooks(response.data);
      } catch (error) {
        console.error("Error fetching user's books:", error);
      }
    };

    fetchUserBooks();
  }, [user.uid]);

  const handleBookSelection = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/requests/exchange', {
        requesterId: user.uid,
        requestedBookId: requestedBook.id,
        offeredBooks: selectedBooks,
        ownerId:ownerId,
      });
      alert('Request submitted successfully!');
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary">Request Exchange</h2>
      <p>Requesting: {requestedBook.title}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <h3 className="text-xl mb-2">Select books to offer:</h3>
        <div className="flex flex-col">
          {offeredBooks.length > 0 ? (
            offeredBooks.map(book => (
              <label key={book.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book.id)}
                  onChange={() => handleBookSelection(book.id)}
                  className="mr-2"
                />
                {book.title}
              </label>
            ))
          ) : (
            <p className="text-gray-500">No books available for exchange.</p>
          )}
        </div>

        <button type="submit" className="bg-primary text-white p-2 rounded mt-4">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestExchange;

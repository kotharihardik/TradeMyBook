import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const EditRequest = () => {
  const { requestId } = useParams();
  const { user } = useUserContext();
  const [request, setRequest] = useState(null);
  const [offeredBooks, setOfferedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
        console.log("User ID:", user.uid);
        console.log("Request ID:", requestId);
        try {
            const response = await axios.get(`http://localhost:4000/api/requests/user/${user.uid}/${requestId}`);
            console.log("Fetched request:", response.data);
            setRequest(response.data);
            setSelectedBooks(response.data.offeredBooks || []);
        } catch (error) {
            if (error.response) {
                console.error("Error fetching request:", error.response.data);
            } else {
                console.error("Error fetching request:", error.message);
            }
        }
    }

    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/books/user/${user.uid}`);
        setOfferedBooks(response.data);
      } catch (error) {
        console.error("Error fetching user's books:", error);
      }
    };

    fetchRequest();
    fetchUserBooks();
  }, [user.uid, requestId]);

  const handleBookSelection = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.patch(`http://localhost:4000/api/requests/exchange/${user.uid}/${requestId}`, {
        offeredBooks: selectedBooks,
      });
      alert('Request updated successfully!');
      navigate('/requests'); // Redirect after successful update
    } catch (error) {
      console.error("Error updating request:", error);
      alert('Failed to update request. Please try again.'); // Error feedback
    }
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary">Edit Request</h2>
      <p className="mb-4 text-gray-400">Current Status: <strong>{request.status}</strong></p>
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
            <p className="text-gray-500">No books available to offer.</p>
          )}
        </div>
        <button type="submit" className="bg-primary text-white p-2 rounded mt-4">
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;

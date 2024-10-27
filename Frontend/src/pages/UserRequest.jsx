// src/components/UserRequests.jsx
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import BookCardReq from '../components/BookCardReq';

const UserRequests = () => {
  const { user } = useUserContext();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/requests/user/${user.uid}`);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    fetchUserRequests();
  }, [user.uid]);

  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`http://localhost:4000/api/requests/delete/${requestId}`);
      setRequests(requests.filter((request) => request.id !== requestId)); // Update state
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary">Your Requests</h2>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {requests.map(request => (
            <BookCardReq key={request.id} request={request} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No requests made yet.</p>
      )}
    </div>
  );
};

export default UserRequests;

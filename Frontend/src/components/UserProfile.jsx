// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/requests/user/${userId}`);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Your Requests</h2>
      {requests.map(request => (
        <div key={request.id} className="p-4 border-b border-gray-700">
          <p>Requested Book: {request.requestedBookId}</p>
          <p>Status: {request.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;

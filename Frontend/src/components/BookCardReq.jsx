
// src/components/BookCardReq.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookCardReq = ({ request, onDelete }) => {
  return (
    <div className="bg-cardBg p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
      <h3 className="text-xl font-semibold text-secondary">Requested Book ID: {request.requestedBookId}</h3>
      <p className="text-gray-400">Offered Books: {request.offeredBooks.join(', ')}</p>
      <p className="text-gray-400">Status: <span className={`font-bold ${request.status === 'accepted' ? 'text-green-500' : request.status === 'declined' ? 'text-red-500' : 'text-yellow-500'}`}>{request.status}</span></p>
      <div className="mt-4 flex space-x-4">
        <Link to={`/Viewrequests/edit/${request.id}`} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
          Edit
        </Link>
        <button onClick={() => onDelete(request.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCardReq;

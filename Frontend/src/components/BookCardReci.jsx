import React from 'react';

const BookCardReci = ({ request, onStatusChange }) => {
    const { id, requestId, offeredBooks, requestedBookId, status } = request;

    // Map status to display text
    const statusText = status === 'accepted' ? 'Accept' : status === 'rejected' ? 'Reject' : 'Pending';

    return (
        <div className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <h3 className='text-lg font-semibold mb-2'>Request for Book ID: <span className="text-yellow-400">{requestedBookId}</span></h3>
            <p className="mb-2">
                Status: <strong className={status === 'accepted' ? 'text-green-400' : status === 'rejected' ? 'text-red-400' : 'text-yellow-400'}>
                    {statusText}
                </strong>
            </p>
            <h4 className="font-semibold mb-1">Offered Books:</h4>
            <ul className="list-disc ml-5 mb-2">
                {offeredBooks.map((book, index) => (
                    <li key={index} className="mb-1">{book}</li>
                ))}
            </ul>
            <div className="flex justify-between mt-3">
                <button
                    onClick={() => onStatusChange(id, requestId, 'accepted')}
                    disabled={status === 'accepted'}
                    className={`px-4 py-2 rounded-lg transition ${status === 'accepted' ? 'bg-green-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    Accept
                </button>
                <button
                    onClick={() => onStatusChange(id, requestId, 'rejected')}
                    disabled={status === 'rejected'}
                    className={`px-4 py-2 rounded-lg transition ${status === 'rejected' ? 'bg-red-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default BookCardReci;

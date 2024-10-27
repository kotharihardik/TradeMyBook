import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const RequestManager = () => {
    const { user } = useUserContext();
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ bookId: '', ownerId: '' });

    useEffect(() => {
        if (user) {
            fetchRequests(user.uid);
        }
    }, [user]);

    const fetchRequests = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/requests/${userId}`);
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleRequestChange = (e) => {
        const { name, value } = e.target;
        setNewRequest(prev => ({ ...prev, [name]: value }));
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/requests', { 
                requesterId: user.uid, 
                bookId: newRequest.bookId, 
                ownerId: newRequest.ownerId 
            });
            fetchRequests(user.uid);
            setNewRequest({ bookId: '', ownerId: '' });
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    const handleStatusUpdate = async (requestId, status) => {
        try {
            await axios.patch(`http://localhost:4000/api/requests/${requestId}`, { status });
            fetchRequests(user.uid);
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    };

    return (
        <div>
            <h2>Book Requests</h2>
            <form onSubmit={handleRequestSubmit}>
                <input
                    name="bookId"
                    value={newRequest.bookId}
                    onChange={handleRequestChange}
                    placeholder="Book ID"
                    required
                />
                <input
                    name="ownerId"
                    value={newRequest.ownerId}
                    onChange={handleRequestChange}
                    placeholder="Owner ID"
                    required
                />
                <button type="submit">Send Request</button>
            </form>

            <h3>Your Requests</h3>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        Book ID: {request.bookId}, Status: {request.status}
                        {request.status === 'pending' && (
                            <button onClick={() => handleStatusUpdate(request.id, 'accepted')}>Accept</button>
                        )}
                        {request.status === 'pending' && (
                            <button onClick={() => handleStatusUpdate(request.id, 'declined')}>Decline</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RequestManager;

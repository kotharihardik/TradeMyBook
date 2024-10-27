import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCardReci from '../components/BookCardReci';
import { useUserContext } from '../context/UserContext';

const ReceivedRequests = () => {
    const [requests, setRequests] = useState([]);
    const { user } = useUserContext();
    const userId = user.uid;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/exchange/received/${userId}`);
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching received requests:", error);
            }
        };
        fetchRequests();
    }, [userId]);

    // Function to handle status updates
    const handleStatusUpdate = async (id, requestId, newStatus) => {
        // Optimistically update the state before the server request
        setRequests((prevRequests) =>
            prevRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
        );

        try {
            // Send the status update request to the server
            await axios.patch(`http://localhost:4000/api/exchange/update/${userId}/${id}`, { status: newStatus, requestId: requestId });
        } catch (error) {
            console.error("Error updating request status:", error);
            // Revert the status change if there's an error
            setRequests((prevRequests) =>
                prevRequests.map((req) => (req.id === id ? { ...req, status: req.status } : req))
            );
        }
    };

    return (
        <div>
            <h2 className="text-white">Received Requests</h2>
            {requests.length > 0 ? (
                requests.map((request) => (
                    <BookCardReci
                        key={request.id}
                        request={request}
                        onStatusChange={handleStatusUpdate}
                    />
                ))
            ) : (
                <p>No requests received.</p>
            )}
        </div>
    );
};

export default ReceivedRequests;

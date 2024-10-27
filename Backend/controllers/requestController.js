// Backend/controllers/requestController.js
const admin = require('firebase-admin');




// Check if Firebase is initialized
if (!admin.apps.length) {

    console.log("lenghth is 0 ???????????????????????????????", admin.apps.length);
    const serviceAccount = require('../serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://book-exchange-platform-f3543-default-rtdb.firebaseio.com/"
    });
}


// Rest of your request controller code remains the same
console.log("lenghth is not not 0 ???????????????????????????????", admin.apps.length);
const db = admin.firestore();

exports.createExchangeRequest = async (req, res) => {
    const { requesterId, requestedBookId, offeredBooks, ownerId } = req.body;

    console.log("Requester ID:", requesterId);
    console.log("Requested Book ID:", requestedBookId);
    console.log("Owner ID:", ownerId);

    try {
        // Check if ownerId is provided
        if (!ownerId) {
            console.log("No owner found for the requested book. Owner ID:", ownerId);
            return res.status(403).json({ message: "Requested book not found" });
        }

        // Step 1: Create the request document in the Requests subcollection of the requester
        const requestDoc = await db.collection('Users').doc(requesterId)
            .collection('Requests').add({
                ownerId,
                requestedBookId,
                offeredBooks,
                status: 'pending',
                requestDate: new Date()
            });

        // Step 2: Create the receive request document in the ReceiveRequests subcollection of the owner
        await db.collection('Users').doc(ownerId)
            .collection('ReceiveRequests').add({
                requestId: requestDoc.id,
                requesterId,
                requestedBookId,
                offeredBooks,
                status: 'pending',
                requestDate: new Date()
            });

        res.status(201).json({ message: "Exchange request created!", requestId: requestDoc.id });
    } catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ message: "Failed to create request" });
    }
};




// Accept an exchange request
exports.acceptExchangeRequest = async (req, res) => {
    const { id } = req.params;

    try {
        await db.collection('Requests').doc(id).update({ status: 'accepted' });
        res.status(200).json({ message: 'Request accepted' });
    } catch (error) {
        console.error("Error accepting request:", error);
        res.status(500).json({ error: 'Failed to accept request' });
    }
};

// Reject an exchange request
exports.rejectExchangeRequest = async (req, res) => {
    const { id } = req.params;

    try {
        await db.collection('Requests').doc(id).update({ status: 'rejected' });
        res.status(200).json({ message: 'Request rejected' });
    } catch (error) {
        console.error("Error rejecting request:", error);
        res.status(500).json({ error: 'Failed to reject request' });
    }
};

// Fetch requests for a specific user
// exports.getUserRequests = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const snapshot = await db.collection('Requests').where('requesterId', '==', userId).get();
//         const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         res.status(200).json(requests);
//     } catch (error) {
//         console.error("Error fetching user requests:", error);
//         res.status(500).json({ error: 'Failed to fetch requests' });
//     }
// };

exports.getUserRequests = async (req, res) => {
    const { userId } = req.params;

    try {
        const snapshot = await db.collection('Users').doc(userId).collection('Requests').get();
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching user requests:", error);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
};


// Delete a request
// exports.deleteRequest = async (req, res) => {
//     const { requestId } = req.params;

//     try {
//         await db.collection('Requests').doc(requestId).delete();
//         res.status(200).json({ message: 'Request deleted successfully' });
//     } catch (error) {
//         console.error("Error deleting request:", error);
//         res.status(500).json({ error: 'Failed to delete request' });
//     }
// };
// Delete a request
exports.deleteRequest = async (req, res) => {
    const { userId, requestId } = req.params;

    try {
        await db.collection('Users').doc(userId).collection('Requests').doc(requestId).delete();
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error("Error deleting request:", error);
        res.status(500).json({ error: 'Failed to delete request' });
    }
};



// Get a specific request by user ID and request ID
// exports.getRequestByUserIdAndRequestId = async (req, res) => {
//     const { userId, requestId } = req.params;

//     // Log the incoming request parameters
//     console.log("Received request with parameters:");
//     console.log(`User ID: ${userId}`);
//     console.log(`Request ID: ${requestId}`);

//     try {
//         // Fetch the request from Firestore
//         const request = await db.collection('Requests').doc(requestId).get();

//         // Log the request document retrieval attempt
//         console.log(`Fetching request with ID: ${requestId} from Firestore...`);

//         // Check if the request exists
//         if (!request.exists) {
//             console.log(`No request found with ID: ${requestId}`);
//             return res.status(404).json({ message: "Request not found" });
//         }

//         // Log the request data
//         const requestData = request.data();
//         console.log("Request data fetched:", requestData);

//         // Validate that the userId matches the request
//         if (requestData.requesterId !== userId) {
//             console.log(`User ID mismatch: expected ${requestData.requesterId}, got ${userId}`);
//             return res.status(404).json({ message: "Request not found for this user" });
//         }

//         // Respond with the found request data
//         res.status(200).json({ id: request.id, ...requestData });
//         console.log("Successfully returned request data:", { id: request.id, ...requestData });
//     } catch (error) {
//         // Log the error message and the error object
//         console.error("Error fetching request:", error.message);
//         console.error("Full error object:", error);

//         // Respond with a generic internal server error
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
// Get a specific request by user ID and request ID
exports.getRequestByUserIdAndRequestId = async (req, res) => {
    const { userId, requestId } = req.params;

    console.log("Received request with parameters:");
    console.log(`User ID: ${userId}`);
    console.log(`Request ID: ${requestId}`);

    try {
        const request = await db.collection('Users').doc(userId).collection('Requests').doc(requestId).get();

        console.log(`Fetching request with ID: ${requestId} from Firestore...`);

        if (!request.exists) {
            console.log(`No request found with ID: ${requestId}`);
            return res.status(404).json({ message: "Request not found" });
        }

        const requestData = request.data();
        console.log("Request data fetched:", requestData);

        res.status(200).json({ id: request.id, ...requestData });
        console.log("Successfully returned request data:", { id: request.id, ...requestData });
    } catch (error) {
        console.error("Error fetching request:", error.message);
        console.error("Full error object:", error);

        res.status(500).json({ message: "Internal server error" });
    }
};





// Update exchange request by request ID
// Update exchange request by request ID
exports.updateExchangeRequest = async (req, res) => {
    const { userId, requestId } = req.params;
    const { offeredBooks } = req.body;

    // Log the incoming data
    console.log("User ID:", userId);
    console.log("Request ID:", requestId);
    console.log("Offered Books:", offeredBooks);

    try {
        const requestRef = db.collection('Users').doc(userId).collection('Requests').doc(requestId);
        const requestDoc = await requestRef.get();

        if (!requestDoc.exists) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Update the offeredBooks field
        await requestRef.update({ offeredBooks });

        res.status(200).json({ message: "Request updated successfully!" });
    } catch (error) {
        console.error("Error updating request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Update request status
exports.updateRequestStatus = async (req, res) => {
    const { requestId } = req.params; // Extract the request ID from the URL
    const { status } = req.body; // The new status (accepted or rejected)

    try {
        // Update the request in the ReceiverRequests subcollection
        const requestRef = db.collection('Users').doc(req.body.userId).collection('ReceiverRequests').doc(requestId); 
        const requestDoc = await requestRef.get();

        if (!requestDoc.exists) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Update the status field
        await requestRef.update({ status });

        res.status(200).json({ message: "Request status updated successfully!" });
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





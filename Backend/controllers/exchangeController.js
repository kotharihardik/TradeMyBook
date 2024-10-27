const admin = require('firebase-admin');



// // Check if Firebase is initialized
// if (!admin.apps.length) {

//     console.log("lenghth is 0 ???????????????????????????????", admin.apps.length);
//     const serviceAccount = require('../serviceAccountKey.json');
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: "https://book-exchange-platform-f3543-default-rtdb.firebaseio.com/"
//     });
// }



// // Rest of your request controller code remains the same
// console.log("lenghth is not not 0 ???????????????????????????????", admin.apps.length);
const db = admin.firestore();

// Fetch received requests for a user
exports.getReceivedRequests = async (req, res) => {
    const { userId} = req.params;

    try {
        // Access the ReceiverRequests subcollection of the specified user
        const snapshot = await db.collection('Users').doc(userId).collection('ReceiveRequests').get();
        const requests = snapshot.docs.map(doc => ({ id: doc.id,requestId: doc.data().requestId, ...doc.data() }));

        // console.log(requests);
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching received requests:", error);
        res.status(500).json({ message: "Failed to fetch requests" });
    }
};


// Update request status
exports.updateRequestStatus = async (req, res) => {
    const { userId, id } = req.params;
    const { status , requestId} = req.body;

    console.log("Received request to update status");
    console.log(`userId: ${userId}, requestId: ${requestId}, newStatus: ${status}`);

    try {
        const requestRef = db.collection('Users').doc(userId).collection('ReceiveRequests').doc(id);
        console.log(`Fetching request document at: ${requestRef.path}`);

        const requestDoc = await requestRef.get();

        if (!requestDoc.exists) {
            console.log("Request document not found");
            return res.status(404).json({ message: "Request not found" });
        }

        const { requesterId } = requestDoc.data();
        console.log(`Found request document. RequesterId: ${requesterId}`);

        // Update the status field in the ReceiverRequests
        await requestRef.update({ status });
        console.log(`Updated status for request ID ${requestId} to ${status}`);

        // Check if the original request document exists
        const requestRef1 = db.collection('Users').doc(requesterId).collection('Requests').doc(requestId);
        const originalRequestDoc = await requestRef1.get();

        if (!originalRequestDoc.exists) {
            console.log(`Original request document not found at: ${requestRef1.path}`);
            const allRequests = await db.collection('Users').doc(requesterId).collection('Requests').get();
            console.log(`All requests for user ${requesterId}:`, allRequests.docs.map(doc => doc.id));
            return res.status(404).json({ message: "Original request not found" });
        }

        console.log(`Attempting to update original request ID: ${requestId}`);
        await requestRef1.update({ status });
        console.log(`Updated original request ID ${requestId} to ${status}`);

        res.status(200).json({ message: "Request status updated successfully!" });

    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

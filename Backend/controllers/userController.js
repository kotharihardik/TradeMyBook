const admin = require('firebase-admin');

exports.getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const userDoc = await admin.firestore().collection('Users').doc(userId).get();
        if (userDoc.exists) {
            res.status(200).json(userDoc.data());
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching user profile", details: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const userProfile = req.body;
    try {
        await admin.firestore().collection('Users').doc(userId).update(userProfile);
        res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating user profile", details: error.message });
    }
};

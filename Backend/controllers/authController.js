const admin = require('firebase-admin');

exports.signup = async (req, res) => {
    const { email, password, name, bio, location } = req.body;
    try {
        const userRecord = await admin.auth().createUser({ email, password, displayName: name });
        await admin.firestore().collection('Users').doc(userRecord.uid).set({ name, email, bio, location });
        res.status(201).json({ uid: userRecord.uid, email });
    } catch (error) {
        res.status(500).json({ error: "Error signing up", details: error.message });
    }
};

exports.login = async (req, res) => {
    const { email } = req.body;
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(userRecord.uid);
        res.status(200).json({ uid: userRecord.uid, token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in", details: error.message });
    }
};

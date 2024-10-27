const admin = require('firebase-admin');
const db = admin.firestore();

// Browse books (with optional filters)
const browseBooks = async (req, res) => {
    try {
        const { category, author } = req.query; // Optional filters

        let booksQuery = db.collection('books');

        if (category) {
            booksQuery = booksQuery.where('category', '==', category);
        }

        if (author) {
            booksQuery = booksQuery.where('author', '==', author);
        }

        const booksSnapshot = await booksQuery.get();
        const books = booksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(books);
    } catch (error) {
        console.error("Error browsing books: ", error);
        res.status(500).send("Error browsing books");
    }
};

module.exports = {
    browseBooks,
};

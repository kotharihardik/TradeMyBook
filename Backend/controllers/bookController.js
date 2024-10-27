const admin = require('firebase-admin');

exports.addBook = async (req, res) => {
    const { userId, title, author, description, condition, category, photos, location } = req.body;
    const ownerId = userId;
    const availableForExchange = true;
    console.log('this route is open');
    try {
        if (!userId) return res.status(400).json({ error: "userId is required" });
        const userRef = admin.firestore().collection('Users').doc(userId).collection('Books');
        const newBookRef = await userRef.add({ title, author, description, condition, category, photos, location, ownerId, availableForExchange });
        res.status(201).json({ id: newBookRef.id, title, author, description, condition, category, photos, location });
    } catch (error) {
        res.status(500).json({ error: "Error adding book", details: error.message });
    }
};

exports.getBooksByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const booksSnapshot = await admin.firestore().collection('Users').doc(userId).collection('Books').get();
        const books = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Error fetching books for user", details: error.message });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        console.log("Fetching books with availableForExchange set to true...");

        // Fetch only books with availableForExchange set to true
        // const booksSnapshot = await admin.firestore()
        //     .collectionGroup('Books')
        //     .where('availableForExchange', '==', true)

        //     .get();

        // const booksSnapshot = await admin.firestore()
        // .collectionGroup('Books')
        // .get();  // Fetching all books from the collection group

        //     const testSnapshot = await admin.firestore()
        // .collectionGroup('Books')
        // .where('title', '!=', '') // Replace with a field that is guaranteed to exist
        // .get();

        // Fetch all books from the collection group
        const booksSnapshot = await admin.firestore()
            .collectionGroup('Books')
            .get();

        if (booksSnapshot.empty) {
            console.log('No books found.');
        } else {
            const availableBooksForExchange = [];

            // Filter the documents to find those with availableForExchange set to true
            booksSnapshot.forEach(doc => {
                const bookData = doc.data();
                if (bookData.availableForExchange === true) {
                    availableBooksForExchange.push({
                        id: doc.id,
                        ...bookData // Spread operator to include all book data
                    });
                    console.log('This book is available for exchange:', bookData.title); // Log title if available
                }
            });

            if (availableBooksForExchange.length === 0) {
                console.log('No books available for exchange found.');
            } else {
                console.log('Available books for exchange:', availableBooksForExchange);
            }
        }



        if (booksSnapshot.empty) {
            console.log('No books found.');
        } else {
            booksSnapshot.forEach(doc => {
                const bookData = doc.data(); // Get the document data
                console.log('Book ID:', doc.id); // Log the Book ID
                console.log('Available for Exchange:', bookData.availableForExchange); // Access the specific field

                // Optionally, if you want to filter based on the availableForExchange field
                if (bookData.availableForExchange === true) {
                    console.log('This book is available for exchange:', bookData.title); // Log title if available
                }
            });
        }

        //         const booksSnapshot = await admin.firestore().collectionGroup('Books').get();

        // if (booksSnapshot.empty) {
        //     console.log('No books found.');
        // } else {
        //     booksSnapshot.forEach(doc => {
        //         const bookData = doc.data();
        //         console.log('Book ID:', doc.id, 'Title:', bookData.title); // Accessing the title
        //     });
        // }


        // Log the size of the result to see if any documents are found
        console.log("Number of books found:", booksSnapshot.size);

        const books = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Log the books array to see if it contains data
        console.log("Books fetched successfully:", books);

        res.status(200).json(books);
    } catch (error) {
        // Log detailed error info
        console.error("Error fetching available books:", error);
        res.status(500).json({ error: "Error fetching available books", details: error.message });
    }
};



// In your controller file:
exports.deleteBook = async (req, res) => {
    const { userId, id } = req.params; // Retrieve userId and id from params

    try {
        console.log("User ID:", userId); // Log for debugging

        const bookRef = admin.firestore().collection('Users').doc(userId).collection('Books').doc(id);
        const bookSnapshot = await bookRef.get();

        // Check if the book exists before trying to delete it
        if (!bookSnapshot.exists) {
            return res.status(404).json({ message: "Book not found" });
        } else {
            console.log("Book found. Proceeding with deletion.");
        }

        await bookRef.delete(); // Attempt to delete the book

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error.message); // Log the error message
        res.status(500).json({ error: "Error deleting book", details: error.message });
    }
};

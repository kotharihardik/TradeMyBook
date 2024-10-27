const admin = require('firebase-admin');
const db = admin.firestore();

class Book {
    constructor(title, author, description, image, category) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.image = image;
        this.category = category;
    }

    // Function to create a new book document
    async save() {
        const bookRef = await db.collection('books').add({
            title: this.title,
            author: this.author,
            description: this.description,
            image: this.image,
            category: this.category,
        });
        return bookRef.id;
    }

    // Function to fetch all books
    static async getAll() {
        const booksSnapshot = await db.collection('books').get();
        const books = booksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return books;
    }
}

module.exports = Book;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BrowseBooks = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/books/all'); // Adjust this to your endpoint
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto text-center mt-16">
                <h2 className="text-4xl font-bold text-purple-600 mb-8">Browse Our Book Collection</h2>

                <div className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="Search for books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-3xl px-6 py-3 text-gray-700 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 transform focus:shadow-xl focus:scale-105"
                    />
                </div>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} ownerId={book.ownerId} />
                    ))
                ) : (
                    <p className="text-gray-500 text-lg">No books found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default BrowseBooks;

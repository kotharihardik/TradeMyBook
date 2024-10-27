import React, { useState } from "react";
import axios from "axios";

const ExchangeBooks = () => {
    const [bookDetails, setBookDetails] = useState({
        title: "",
        author: "",
        description: "",
        image: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/exchange", bookDetails);
            console.log("Book added:", response.data);
            // Reset form
            setBookDetails({
                title: "",
                author: "",
                description: "",
                image: "",
                category: "",
            });
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Exchange Your Book</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={bookDetails.title}
                        onChange={handleChange}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={bookDetails.author}
                        onChange={handleChange}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={bookDetails.description}
                        onChange={handleChange}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={bookDetails.image}
                        onChange={handleChange}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={bookDetails.category}
                        onChange={handleChange}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Exchange Book
                </button>
            </form>
        </div>
    );
};

export default ExchangeBooks;

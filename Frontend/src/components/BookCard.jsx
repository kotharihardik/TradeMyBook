// src/components/BookCard.jsx
import React from 'react';
import RequestExchange from './RequestExchange';

const BookCard = ({ book, offeredBooks , ownerId}) => {
  const [isRequesting, setIsRequesting] = React.useState(false);

  const handleRequestClick = () => {
    setIsRequesting(true);
  };

  return (
    <div className="bg-cardBg p-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
      <h2 className="text-xl font-bold text-secondary">{book.title}</h2>
      <p className="text-gray-400">Author: {book.author}</p>
      <p className="text-gray-400">Condition: {book.condition}</p>

      <button
        onClick={handleRequestClick}
        className="bg-primary text-white p-2 rounded mt-4"
      >
        Request Exchange
      </button>

      {isRequesting && <RequestExchange requestedBook={book} offeredBooks={offeredBooks} ownerId={ownerId} />}
    </div>
  );
};

export default BookCard;

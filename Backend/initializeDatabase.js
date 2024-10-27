const admin = require('firebase-admin');

// Firebase admin initialization
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://book-exchange-platform-f3543-default-rtdb.firebaseio.com/" // Replace with your database URL
});

// Initialize Firestore
const db = admin.firestore();

async function initializeDatabase() {
  const usersCollection = db.collection('Users');

  // Example User
  const user1Ref = usersCollection.doc('user_1');
  await user1Ref.set({
    name: "John Doe", // String
    email: "john@example.com", // String
    bio: "Book lover", // String
    location: "New York", // String
  });

  // Adding Books subcollection
  const user1Books = user1Ref.collection('Books');
  await user1Books.doc('book_1').set({
    title: "The Great Gatsby", // String
    author: "F. Scott Fitzgerald", // String
    description: "A novel set in the Roaring Twenties.", // String
    condition: "New", // String (can be an enum)
    category: "Fiction", // String (can be an enum)
    photos: [], // Array of Strings (URLs)
    location: "Library", // String
  });

  await user1Books.doc('book_2').set({
    title: "1984", // String
    author: "George Orwell", // String
    description: "A dystopian novel about totalitarianism.", // String
    condition: "Used", // String (can be an enum)
    category: "Dystopian", // String (can be an enum)
    photos: [], // Array of Strings (URLs)
    location: "Bookstore", // String
  });

  // Example Requests subcollection
  const user1Requests = user1Ref.collection('Requests');
  await user1Requests.doc('request_1').set({
    book_id: "book_2", // String (refers to the ID of the book)
    owner_id: "user_2", // String (refers to the ID of the owner)
    status: "pending", // String (can be "pending", "accepted", "declined")
    request_date: new Date().toISOString(), // String (ISO format date)
  });

  console.log("Database initialized successfully!");
}

// Execute the initialization
initializeDatabase().catch(console.error);

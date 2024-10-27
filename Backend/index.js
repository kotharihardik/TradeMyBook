const express = require('express');

import multer from "multer";
import imageDownloader from "image-downloader"; // Ensure this package is installed
import mime from "mime-types"; // Ensure this package is installed
import { uploadToS3 } from "./s3Service.js"; // Import your S3 upload service


const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');

const app = express();
const PORT = 4000;

// Firebase Admin Initialization
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://book-exchange-platform-f3543-default-rtdb.firebaseio.com/"
    });
}

const db = admin.firestore();

// Middleware setup
app.use(cors({ origin: 'http://localhost:8000' }));
app.use(bodyParser.json());
app.use(express.json());

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Work perfectly');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes); 
app.use('/api/exchange', exchangeRoutes); 


// Route to upload images by link
app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
      url: link,
      dest: '/tmp/' + newName,
    });
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
    res.json(url);
  });
  
  // Route to upload images from local machine
  app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  });

// 404 Handler
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

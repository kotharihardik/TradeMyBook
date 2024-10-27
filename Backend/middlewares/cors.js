const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    optionsSuccessStatus: 200,
};

const enableCors = cors(corsOptions);

module.exports = enableCors;

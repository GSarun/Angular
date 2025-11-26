const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const queueRoutes = require('./routes/queue.routes');
app.use('/api/queue', queueRoutes);

app.get('/', (req, res) => {
    res.send('Queue Manager API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

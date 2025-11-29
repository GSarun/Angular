const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Middleware (ตัวกลางจัดการ Request)
// ==========================================
app.use(cors()); // อนุญาตให้ Frontend เรียก API ได้
app.use(express.json()); // รองรับการส่งข้อมูลแบบ JSON

// ==========================================
// Routes (เส้นทาง API)
// ==========================================
const queueRoutes = require('./routes/queue.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/queue', queueRoutes); // API สำหรับจัดการคิว
app.use('/api/auth', authRoutes);   // API สำหรับ Login/Register

// Test Route
app.get('/', (req, res) => {
    res.send('Queue Manager API is running');
});

// Error Handling Middleware
app.use(errorHandler);

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test routes
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!', port: port });
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint working!' });
});

// User routes placeholder
app.get('/user/test', (req, res) => {
    res.json({ message: 'User endpoint working!' });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`🚀 Test it at: http://localhost:${port}/test`);
});
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Users from './controllers/users.js';
import { uploadProfilePhoto } from './utils/upload.js';

const app = express();
const port = 5002;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Simple user routes
app.get('/user/list', Users.index);
app.get('/user/view/:id', Users.view);
app.put('/user/edit/:id', Users.edit);
app.delete('/user/delete/:id', Users.deleteData);
app.post('/user/register', Users.register);
app.post('/user/login', Users.login);
app.post('/user/update-photo/:id', uploadProfilePhoto.single('photo'), Users.updatePhoto);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
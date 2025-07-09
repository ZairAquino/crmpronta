import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import cors from "cors";
import serverRoutes from "./routes/serverRoutes.js";

dotenv.config();

//Setup Express App
const app = express();

// Set up CORS
app.use(cors());

//Set Midleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

//Load Routes
app.use("/", serverRoutes);

// Get port from environment and store in Express.
const port = process.env.PORT || "5002";
app.listen(port, () => {
  console.log(`Server listining at http://localhost:${port}`);
});


//Database Connection
const DATABASE_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
connectDB(DATABASE_URL, DB_NAME);

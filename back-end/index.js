// Entry point for reader app backend
import express from 'express';
import cors from 'cors';
import { consultorRouter } from './components/network.js';

// Initialize the app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Enable JSON request body parsing
app.use(express.json());

// Define routers
app.use('/api/consultor', consultorRouter);

// Start the server
app.listen(3001);
console.log('The app is listening at http://localhost:3001');

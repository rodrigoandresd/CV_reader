// entry point for reader app backend
import express from 'express';
import cors from 'cors';
import { consultorRouter } from './components/network.js';

// init the app
const app = express();

app.use(cors());

app.use(express.json());

//routers
app.use('/api/consultor', consultorRouter);

app.listen(3001);
console.log('The app is listening at http://localhost:3001');

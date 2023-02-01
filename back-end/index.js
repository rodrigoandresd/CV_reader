// entry point for reader app backend
import express, { Router } from 'express';
import { dataBaseConnect } from './database/db_config.js';
import { consultorRouter } from './components/network.js';

// init the app
const app = express();

// init the dataBase conecction
dataBaseConnect();

app.use(express.json());


//routers
app.use('/api/consultor', consultorRouter);

app.listen(3000);
console.log('The app is listening at http://localhost:3000')

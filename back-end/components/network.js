import { Router } from 'express';
import { uploadFile } from './controller.js';
import { reader } from '../reader/automate.js';
import fs from 'fs';

// Create a new router instance
export const consultorRouter = Router();

// Define a handler for the root path
consultorRouter.get('/', function(request, response) {
    if (response.statusCode === 200) {
        response.send('OK');
        console.log('OK');
    } else {
        response.send('BAD REQUEST');
        console.log('BAD REQUEST');
    }
});

// Define a handler for the /upload path
consultorRouter.post('/upload', uploadFile.single('myFile'), async function(request, response) {
    // Log the uploaded file
    console.log(request.file);

    // Call the reader function to process the uploaded file
    reader(`./uploads/${request.file.originalname}`);
    console.log('File uploaded at network');

    // Delete the uploaded file from the server
    fs.unlink(`./uploads/${request.file.originalname}`, (err) => {
        if (err) {
            throw err;
        }
        console.log('File deleted at network')
    })
});

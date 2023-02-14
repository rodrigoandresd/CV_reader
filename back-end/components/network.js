import { Router } from 'express';
import { uploadFile } from './controller.js';
import { reader } from '../reader/automate.js';
import fs from 'fs';

export const consultorRouter = Router();

consultorRouter.get('/', function(request, response) {
    if (response.statusCode === 200) {
        response.send('OK');
        console.log('OK');
    } else {
        response.send('BAD REQUEST');
        console.log('BAD REQUEST');
    }
});

consultorRouter.post('/upload', uploadFile.single('myFile'), async function(request, response) {
    console.log(request.file);
    reader(`./uploads/${request.file.originalname}`);
    console.log('File uploaded at network');
    fs.unlink(`./uploads/${request.file.originalname}`, (err) => {
        if (err) {
            throw err;
        }
        console.log('File deleted at network')
    })
});


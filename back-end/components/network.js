import { Router } from 'express';
import multer from 'multer';
import { createConsultor, uploadFile } from './controller.js';

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

consultorRouter.post('/', function(request, response) {
    
    const name = request.body.name;
    const email = request.body.email;
    const skills = request.body.skills;
    const position = request.body.position;

    createConsultor(name, email, skills, position)
        .then(() => {
            response.send('Consultor created at net work');
        })
        .catch(error => {
            response.send(error);
            console.log(error);
        });
});

consultorRouter.post('/upload', uploadFile.single('myFile'), async function(request, response) {
    console.log(request.file)
    response.send('File uploaded');
});

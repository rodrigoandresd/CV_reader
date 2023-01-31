import { addConsultor } from './store.js';

function createConsultor (name, email, skills, position) {
    
    return new Promise((resolve, reject) => {
        if (!name || !email || !skills || !position) {
            console.log('[Error at controller] invalid data');
            return reject('Invalid data');
        };

        const newConsultor = {
            name: name,
            email: email,
            skills: skills,
            position: position,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        addConsultor(newConsultor);
        console.log('consultor created at controller');
        resolve(newConsultor);
    });  
};

export { createConsultor };
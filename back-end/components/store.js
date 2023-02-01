import { model } from '../model/consultor.model.js';

function addConsultor (consultor) {
    const newConsultor = new model(consultor);
    newConsultor.save();
    console.log('consultor created at store');
};

export { addConsultor };
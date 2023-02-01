import mongoose from 'mongoose';

async function dataBaseConnect () {
    try {
        await mongoose.connect('mongodb+srv://davidperez95:TalanReader@talan-reader.do2lybq.mongodb.net/?retryWrites=true&w=majority');
        console.log('[DataBase] Connection Success');
    } catch (error) {
        console.log('[DataBase] Failed Connection');
    }
};

export { dataBaseConnect };
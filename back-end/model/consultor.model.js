import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    position: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
    },
});

const model = mongoose.model('Consultor_model', newSchema);

export { model };
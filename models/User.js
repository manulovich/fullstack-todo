import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tasks: [{
        value: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

export default model('User', User);

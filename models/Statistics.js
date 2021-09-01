import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Statistics = new Schema({
    countUsers: {
        type: Number,
        default: 0
    },
    countTasks: {
        type: Number,
        default: 0
    }
});

export default model('Statistics', Statistics);

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/backproject');
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
    }
};

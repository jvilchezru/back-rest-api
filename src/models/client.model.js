import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        address: {
            type: String
        },
        web: {
            type: String
        },
        industry: {
            type: String
        },
        status: {
            type: String
        },
        phone: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Client', clientSchema);

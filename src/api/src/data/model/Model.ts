import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },
        //
        created_by: String,
        updated_by: String,
        deleted_by: String,
        updated_at: Date,
        deleted_at: Date,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'sys_updated_at',
        },
        toJSON: { getters: true },
        id: false,
    }
);

export default mongoose.model('model', modelSchema, 'models');

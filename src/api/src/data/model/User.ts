import mongoose, { InferSchemaType, Schema } from 'mongoose';

const ROLE_LEVEL = {
    0: 'Super Admin',
    1: 'User',
    2: 'Collaborator',
};

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [5, 'Passwords must be at least {MINLENGTH} characters'],
        },
        role_level: {
            type: Number,
            enum: [0, 1, 2],
            default: 1,
        },
        status: String,
        is_deleted: {
            type: Number,
            enum: [0, 1],
            default: 0,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },
        display_name: {
            type: String,
            required: [true, 'Name is required'],
        },
        phone: {
            require: false,
            type: String,
        },
        address: String,
        avatar: String,
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

userSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $ne: null } } });

// Infer TypeScript type from Mongoose schema
type UserType = InferSchemaType<typeof userSchema>;

export { UserType };
export default mongoose.model<UserType>('user', userSchema, 'users');

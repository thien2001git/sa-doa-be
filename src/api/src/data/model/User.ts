import mongoose from 'mongoose';

const ROLE_LEVEL = {
    0: 'Super Admin',
    1: 'User',
    2: 'Collaborator',
};
const userSchema = new mongoose.Schema(
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
            minLength: [5, 'Password must be at least {MINLENGTH} characters'],
            maxLength: [32, 'Password must be at least {MAXLENGTH} characters'],
        },
        role_level: {
            type: Number,
            enum: Object.keys(ROLE_LEVEL),
            default: 1,
        },
        status: String,
        is_deleted: {
            type: Number,
            enum: [0, 1],
            default: 0,
        },
        // Dùng để đăng nhập
        user_name: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },
        // dùng để hiện thị
        display_name: {
            type: String,
            required: [true, 'Name is required'],
        },
        phone: {
            type: String,
            unique: true,
        },
        address: String,
        avatar: String,
        //
        created_by: String,
        updated_by: String,
        deleted_by: String,

        //? Cập nhật lại khi người dùng cập nhật doc / trừ view, like
        updated_at: Date,
        deleted_at: Date,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            //? Tự tạo mỗi lần cập nhật doc
            updatedAt: 'sys_updated_at',
        },
        toJSON: { getters: true },
        id: false,
    }
);

export default mongoose.model('user', userSchema, 'users');

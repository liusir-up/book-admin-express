import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    nickName: {
        type: String,
    },
    password: {
        type: String,
    },
    sex: {
        type: String,
    },
    role: {
        type: String,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    },
})

export default userSchema;
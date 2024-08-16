import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    cover: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    stock: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    publishAt: {
        type: Number,
        default: null,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    },
});

export default bookSchema;
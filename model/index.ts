import userSchema from "./userModel";
import bookSchema from "./bookModel";
import categorySchema from "./categoryModel";
import borrowSchema from "./borrowModel";

const mongoose = require('mongoose');

var uri =
    'mongodb://liuzicheng:Password@ac-0a0hlin-shard-00-00.bvzw2jg.mongodb.net:27017,ac-0a0hlin-shard-00-01.bvzw2jg.mongodb.net:27017,ac-0a0hlin-shard-00-02.bvzw2jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-bbv19c-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

async function main() {
    await mongoose.connect(uri);
}

main()
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log(err)
    })

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Category = mongoose.model('Category', categorySchema);
const Borrow = mongoose.model('Borrow', borrowSchema);
export { User, Book, Category, Borrow };
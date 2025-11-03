const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Please add a year']
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        trim: true  
    },
    isbn: {
        type: Number,
        required: [true, 'Please add an ISBN'],
        trim: true,
        unique: true
    },
    genre: {
        type: String,
        trim: true,
        required: [true, 'Please add a genre']
    },
    img: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
    

})

module.exports = mongoose.model('Books', BooksSchema);
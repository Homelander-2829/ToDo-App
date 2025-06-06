// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Todo', todoSchema);
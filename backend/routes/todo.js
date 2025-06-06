const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 🔥 GET all todos for a user (FIXED)
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching todos for user:', userId); // Debug log
        
        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error fetching todos:', err); // Debug log
        res.status(500).json({
            message: "Failed to fetch todos"
        });
    }
});

// ✅ Add new todo (ALREADY CORRECT)
router.post('/', async (req, res) => {
    const { userId, text } = req.body;

    try {
        const newTodo = new Todo({ userId, text });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({
            message: "Failed to add todo"
        });
    }
});

// 🔥 UPDATE todo (mark as completed) - ADDED
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: true },
            { new: true }
        );
        
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ message: "Failed to update todo" });
    }
});

// ✅ Delete todo (ALREADY CORRECT)
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.status(200).json({ message: "Todo deleted" });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: "Failed to delete todo" });
    }
});

module.exports = router;
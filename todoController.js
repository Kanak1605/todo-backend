
const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({ ...req.body, user: req.user.id });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updated = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Todo not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const deleted = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deleted) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { read: true },
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

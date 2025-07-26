
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createTodo,
    updateTodo,
    deleteTodo,
    markAsRead
} = require('../controllers/todoController');

router.post('/', auth, createTodo);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);
router.patch('/:id/read', auth, markAsRead);

module.exports = router;

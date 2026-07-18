const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const todoController = require('../controller/todoController');

router.post('/', protect, todoController.createTodo);
router.get('/', protect, todoController.getTodos);
router.put('/:id', protect, todoController.updateTodo);
router.delete('/:id', protect, todoController.deleteTodo);
router.put('/:id/toggle', protect, todoController.toggleComplete);

module.exports = router;
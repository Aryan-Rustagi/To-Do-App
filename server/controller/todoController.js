const Todo = require('../models/Todo');

async function createTodo(req, res) {
    try {
        const todo = await Todo.create({
            user: req.user.email,
            title: req.body.title,
            description: req.body.description
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getTodos(req, res) {
    try {
        const todos = await Todo.find({ user: req.user.email });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateTodo(req, res) {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.email },
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteTodo(req, res) {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.email
        });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function toggleComplete(req, res) {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.email
        });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    toggleComplete
};
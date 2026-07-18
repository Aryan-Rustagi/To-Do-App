import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../src/styles/todo.css';

function Todo() {
    var [todos, setTodos] = useState([]);
    var [title, setTitle] = useState('');
    var [desc, setDesc] = useState('');
    var [editingId, setEditingId] = useState(null);
    var [editTitle, setEditTitle] = useState('');
    var [editDesc, setEditDesc] = useState('');
    var navigate = useNavigate();
    var token = localStorage.getItem('token');
    var email = localStorage.getItem('email') || 'User';

    useEffect(function() {
        if (!token) {
            navigate('/login');
            return;
        }

        async function fetchTodos() {
            try {
                var response = await axios.get('http://localhost:5000/api/todos', {
                    headers: { Authorization: 'Bearer ' + token }
                });
                setTodos(response.data);
            } catch (error) {
                console.log('Error fetching todos:', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('email');
                    navigate('/login');
                }
            }
        }

        fetchTodos();
    }, [token, navigate]);

    async function handleAdd(event) {
        event.preventDefault();
        if (!title || !desc) return;

        try {
            var response = await axios.post(
                'http://localhost:5000/api/todos',
                { title: title, description: desc },
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setTodos(todos.concat(response.data));
            setTitle('');
            setDesc('');
        } catch (error) {
            console.log('Error adding todo:', error);
        }
    }

    async function handleToggle(todoId) {
        try {
            var response = await axios.put(
                'http://localhost:5000/api/todos/' + todoId + '/toggle',
                {},
                { headers: { Authorization: 'Bearer ' + token } }
            );

            function updateItem(todo) {
                if (todo._id === todoId) {
                    return response.data;
                }
                return todo;
            }

            setTodos(todos.map(updateItem));
        } catch (error) {
            console.log('Error toggling todo:', error);
        }
    }

    async function handleDelete(todoId) {
        try {
            await axios.delete('http://localhost:5000/api/todos/' + todoId, {
                headers: { Authorization: 'Bearer ' + token }
            });

            function keepTodo(todo) {
                return todo._id !== todoId;
            }

            setTodos(todos.filter(keepTodo));
        } catch (error) {
            console.log('Error deleting todo:', error);
        }
    }

    async function handleSaveEdit(todoId) {
        if (!editTitle || !editDesc) return;
        try {
            var response = await axios.put(
                'http://localhost:5000/api/todos/' + todoId,
                { title: editTitle, description: editDesc },
                { headers: { Authorization: 'Bearer ' + token } }
            );

            function replaceEdited(todo) {
                if (todo._id === todoId) {
                    return response.data;
                }
                return todo;
            }

            setTodos(todos.map(replaceEdited));
            setEditingId(null);
        } catch (error) {
            console.log('Error updating todo:', error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/');
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescChange(event) {
        setDesc(event.target.value);
    }

    function handleEditTitleChange(event) {
        setEditTitle(event.target.value);
    }

    function handleEditDescChange(event) {
        setEditDesc(event.target.value);
    }

    function startEditing(todo) {
        setEditingId(todo._id);
        setEditTitle(todo.title);
        setEditDesc(todo.description);
    }

    function cancelEditing() {
        setEditingId(null);
    }

    function renderTodoItem(todo) {
        var isEditing = editingId === todo._id;

        function onToggle() {
            handleToggle(todo._id);
        }

        function onDelete() {
            handleDelete(todo._id);
        }

        function onEdit() {
            startEditing(todo);
        }

        function onSave() {
            handleSaveEdit(todo._id);
        }

        var cardClass = 'todo-item-card' + (todo.completed ? ' completed' : '');
        var checkboxClass = 'todo-checkbox' + (todo.completed ? ' checked' : '');

        return (
            <div key={todo._id} className={cardClass}>
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            value={editTitle}
                            onChange={handleEditTitleChange}
                            className="todo-input"
                        />
                        <input
                            value={editDesc}
                            onChange={handleEditDescChange}
                            className="todo-input"
                        />
                    </div>
                ) : (
                    <div className="todo-content">
                        <button onClick={onToggle} className={checkboxClass}>
                            {todo.completed && <span className="checkmark">&#10003;</span>}
                        </button>
                        <div className="todo-text">
                            <h4 className="todo-title">{todo.title}</h4>
                            <p className="todo-desc">{todo.description}</p>
                        </div>
                    </div>
                )}

                <div className="todo-actions">
                    {isEditing ? (
                        <React.Fragment>
                            <button onClick={onSave} className="btn-save">Save</button>
                            <button onClick={cancelEditing} className="btn-cancel">Cancel</button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button onClick={onEdit} className="btn-edit">Edit</button>
                            <button onClick={onDelete} className="btn-delete">Delete</button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="todo-page">
            <header className="todo-header">
                <div className="logo-wrap">
                    <div className="logo-icon">&#10003;</div>
                    <span className="logo-text">TaskFlow</span>
                </div>
                <div className="user-section">
                    <div className="user-info">
                        <div className="user-avatar">{email.substring(0, 2)}</div>
                        <span className="user-email">{email}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-signout">Sign Out</button>
                </div>
            </header>

            <main className="todo-main">
                <div className="todo-add-card">
                    <h3 className="card-title">Create new task</h3>
                    <form onSubmit={handleAdd} className="todo-form">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={handleTitleChange}
                            className="todo-input"
                        />
                        <input
                            type="text"
                            placeholder="Add details or description..."
                            value={desc}
                            onChange={handleDescChange}
                            className="todo-input"
                        />
                        <button type="submit" className="btn-primary">Add Task</button>
                    </form>
                </div>

                <h3 className="list-title">Tasks</h3>

                <div className="todo-list">
                    {todos.map(renderTodoItem)}

                    {todos.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">&#128221;</div>
                            <h4>No tasks yet</h4>
                            <p>Create your first task above to get started!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Todo;
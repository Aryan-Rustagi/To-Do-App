import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(function() {
        if (!token) {
            navigate('/login');
            return;
        }

        async function fetchTodos() {
            try {
                const response = await axios.get('http://localhost:5000/api/todos', {
                    headers: { Authorization: 'Bearer ' + token }
                });
                setTodos(response.data);
            } catch (error) {
                console.log('Error fetching todos:', error);
            }
        }

        fetchTodos();
    }, []);

    async function handleAdd(event) {
        event.preventDefault();

        if (title === '' || desc === '') {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/todos', {
                title: title,
                description: desc
            }, {
                headers: { Authorization: 'Bearer ' + token }
            });

            const newTodos = todos.concat(response.data);
            setTodos(newTodos);
            setTitle('');
            setDesc('');
        } catch (error) {
            console.log('Error adding todo:', error);
        }
    }

    async function handleToggle(todoId) {
        try {
            const response = await axios.put('http://localhost:5000/api/todos/' + todoId + '/toggle', {}, {
                headers: { Authorization: 'Bearer ' + token }
            });

            function updateTodo(todo) {
                if (todo._id === todoId) {
                    return response.data;
                } else {
                    return todo;
                }
            }

            const updatedTodos = todos.map(updateTodo);
            setTodos(updatedTodos);
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

            const remainingTodos = todos.filter(keepTodo);
            setTodos(remainingTodos);
        } catch (error) {
            console.log('Error deleting todo:', error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    async function handleSaveEdit(todoId) {
        if (editTitle === '' || editDesc === '') return;
        try {
            const response = await axios.put('http://localhost:5000/api/todos/' + todoId, {
                title: editTitle,
                description: editDesc
            }, {
                headers: { Authorization: 'Bearer ' + token }
            });
            
            setTodos(todos.map(todo => todo._id === todoId ? response.data : todo));
            setEditingId(null);
        } catch (error) {
            console.log('Error updating todo:', error);
        }
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDesc(event.target.value);
    }

    return (
        <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
            <h2>
                My Todos 
                <button onClick={handleLogout} style={{ marginLeft: 20 }}>
                    Logout
                </button>
            </h2>

            <form onSubmit={handleAdd}>
                <input 
                    type="text"
                    placeholder="Title" 
                    value={title} 
                    onChange={handleTitleChange}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />

                <input 
                    type="text"
                    placeholder="Description" 
                    value={desc} 
                    onChange={handleDescriptionChange}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />

                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    Add Todo
                </button>
            </form>

            {todos.map(function(todo) {
                return (
                    <div 
                        key={todo._id} 
                        style={{ 
                            border: '1px solid #ccc', 
                            padding: 10, 
                            marginBottom: 10, 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            opacity: todo.completed ? 0.6 : 1
                        }}
                    >
                        {editingId === todo._id ? (
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <input 
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    style={{ width: '100%', marginBottom: '5px', padding: '4px' }}
                                />
                                <input 
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    style={{ width: '100%', padding: '4px' }}
                                />
                            </div>
                        ) : (
                            <div>
                                <h3>{todo.title}</h3>
                                <p>{todo.description}</p>
                            </div>
                        )}

                        <div>
                            {editingId === todo._id ? (
                                <>
                                    <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                                    <button onClick={() => setEditingId(null)} style={{ marginLeft: 10 }}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={function() { handleToggle(todo._id); }}>
                                        {todo.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button 
                                        onClick={function() {
                                            setEditingId(todo._id);
                                            setEditTitle(todo.title);
                                            setEditDesc(todo.description);
                                        }} 
                                        style={{ marginLeft: 10 }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={function() { handleDelete(todo._id); }} 
                                        style={{ marginLeft: 10 }}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}

            {todos.length === 0 && <p>No todos yet. Add one above!</p>}
        </div>
    );
}

export default Todo;
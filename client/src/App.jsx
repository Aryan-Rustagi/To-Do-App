import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Todo from '../pages/Todo';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/todo" element={<Todo />} />
            </Routes>
        </div>
    );
}

export default App;
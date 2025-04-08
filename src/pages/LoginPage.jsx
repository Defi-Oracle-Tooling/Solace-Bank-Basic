import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });
            alert('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid username or password.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <div className="mt-4">
                <label className="block">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full"
                />
                <label className="block mt-4">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full"
                />
                <button
                    onClick={handleLogin}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
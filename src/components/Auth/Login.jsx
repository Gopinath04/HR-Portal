import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Fetch users from the JSON file
            const response = await fetch('/data/employeeProfiles.json'); // Adjust the path as needed
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const users = await response.json();
    
            // Validate JSON structure
            if (!Array.isArray(users)) {
                throw new Error('Invalid user data format');
            }
    
            // Check if the email and password match any user
            const user = users.find(
                (user) => user.email === email && user.password === password
            );
    
            if (user) {
                // Save the logged-in user's role in localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Login successful!');
                navigate(user.role === 'hr' ? '/hr/hrdashboard' : '/employee/employeeProfile'); // Redirect based on role
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className="login-bg d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">HR Portal Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Login</button>

                    <div className="text-center p-4">
                        <a href="/SignUp">SignUp</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
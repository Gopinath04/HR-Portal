import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'employee'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Get existing users from localStorage or initialize an empty array
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
        // Check if the username or email already exists
        const userExists = existingUsers.some(
            (user) => user.username === formData.username || user.email === formData.email
        );
    
        if (userExists) {
            alert('User with this username or email already exists!');
            return;
        }
    
        // Add the new user to the list and save it to localStorage
        existingUsers.push(formData);
        localStorage.setItem('users', JSON.stringify(existingUsers));
    
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="login-bg d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            className="form-select"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">SignUp</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;





import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee', // Default role
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      setMessage('User with this email already exists.');
      return;
    }

    // Add the new user to the list
    users.push(formData);

    // Save the updated user list back to local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    setMessage('Signup successful! You can now log in.');
  };

  return (
    

<div className="container mt-4 pb-5">
<div className="row justify-content-center">
  <div className="col-md-6 col-lg-5">
    <div className="card p-4 bg-light shadow-sm">
      <h2 className="text-center mb-2 h4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3 d-flex flex-column align-items-start">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label for="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
          <label for="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-start">
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
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Create Account</button>
        </div>
      </form>
      <p className="text-center mt-3 mb-0">
        Already have an account? <a href="#" className="text-primary">Login</a>
      </p>
      {message && <p class="alert alert-success mt-3" role="alert">{message}</p>}
    </div>
  </div>
</div>
</div>


  );
};

export default Signup;
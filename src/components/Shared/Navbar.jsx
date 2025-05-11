import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Update user state when route changes (like after login/logout)
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setUser(loggedInUser);
    }, [location]);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null); // Clear user from state
        navigate('/'); // Navigate to homepage
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">HR Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/SignUp">SignUp</Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                {user.role === 'employee' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Employee/EmployeeProfile">Employee</Link>
                                    </li>
                                )}
                                {user.role === 'hr' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/HR/HRDashboard">HR Dashboard</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button 
                                        className="nav-link btn btn-link" 
                                        onClick={handleLogout}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

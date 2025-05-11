import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import HRDashboard from './components/HR/HRDashboard';
import EmployeeProfile from './components/Employee/EmployeeProfile';
import LeaveRequest from './components/Employee/LeaveRequest';
import RoleBasedAccess from './components/Auth/RoleBaswdAccess';
import './styles/custom.css'; // Custom CSS for styling


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));

    const handleLogin = (user) => {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        };
    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={
                    <section className='login-bg'>
                    <div className="container z-3 position-relative bg-white p-3">
                    <h1>Welcome to HR Portal</h1>
                    </div>
                    </section>
                    } />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/HR/HRDashboard" element={<HRDashboard />} />
                <Route path="/employee/employeeProfile" element={<EmployeeProfile />} />
                <Route path="/employee/leaveRequest" element={<LeaveRequest />} />
                <Route path="/rolebaswdaccess" element={<RoleBasedAccess />} />
                <Route path="/" element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    );
};


export default App;
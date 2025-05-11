import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsonData from '../../data/employeeProfiles.json'; // Import the JSON data

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(''); // Error state for displaying errors
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loggedInUserEmail = loggedInUser?.email;

    useEffect(() => {
        if (!loggedInUserEmail) {
            setError('No logged-in user found.');
            return;
        }

        // Use the imported jsonData to find the logged-in user's details
        const user = jsonData.find((emp) => emp.email === loggedInUserEmail);
        if (user) {
            setEmployee(user);
        } else {
            setError('Logged-in user not found in employee data.');
        }
    }, [loggedInUserEmail]);

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>; // Display error message
    }

    if (!employee) {
        return <p>Loading user data...</p>; // Show a loading message while data is being fetched
    }

    return (

    <div className="login-bg vh-100">
      

      <div className="container text-center text-white z-3 position-relative">
        <h2 className="mb-5 text-warning fw-bold">Employee Dashboard</h2>
        <div className="row justify-content-center">
          {/* Welcome Card */}
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Welcome User</h5>
                <p className="card-text fw-semibold">{employee.firstName} {employee.lastName}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>

          {/* Leave Status Card */}
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{employee.firstName} View your leave details!</h5>
                <button className="btn btn-primary">View Leave Status</button>
              </div>
            </div>
          </div>

          {/* Apply Leave Card */}
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Apply for Leave</h5>
                <Link className="btn btn-primary" to="/Employee/LeaveRequest">Apply Leave</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default EmployeeProfile;
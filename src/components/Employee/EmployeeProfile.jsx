import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsonData from '../../data/employeeProfiles.json';

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [totalLeaves, setTotalLeaves] = useState(0);
    const [pendingLeaves, setPendingLeaves] = useState(0);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loggedInUserEmail = loggedInUser?.email;

    useEffect(() => {
        if (!loggedInUserEmail) {
            setError('No logged-in user found.');
            return;
        }

        const user = jsonData.find(emp => emp.email === loggedInUserEmail);
        if (user) {
            setEmployee(user);
        } else {
            setError('User not found.');
        }
    }, [loggedInUserEmail]);

    const handleViewLeaveStatus = async () => {
    try {
        const response = await fetch('http://localhost:5000/leaveRequests');
        if (!response.ok) throw new Error('Failed to fetch leave data.');

        const leaveData = await response.json();

        // Filter leave requests for the logged-in employee
        const userLeaves = leaveData.filter(req => req.employee.email === employee.email);

        // Calculate total, pending, and taken leaves
        const total = userLeaves.length;
        const pending = userLeaves.filter(req => req.status === 'Pending').length;
        const taken = userLeaves.filter(req => req.status === 'Approved').length;

        // Update state
        setTotalLeaves(total);
        setPendingLeaves(pending);
        setShowLeaveModal(true);

        // Optionally, store taken leaves in a new state
        setTakenLeaves(taken);
    } catch (err) {
        console.error(err);
        setError('Unable to load leave data.');
    }
};

  const [takenLeaves, setTakenLeaves] = useState(0);

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!employee) return <p>Loading user data...</p>;

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
                                <button className="btn btn-primary" onClick={() => setShowDetailModal(true)}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Leave Status Card */}
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">{employee.firstName}, view your leave details!</h5>
                                <button className="btn btn-primary" onClick={handleViewLeaveStatus}>
                                    View Leave Status
                                </button>
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

            {/* Employee Details Modal */}
            {showDetailModal && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Employee Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                            </div>
                            <div className="modal-body text-start">
                                <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
                                <p><strong>Email:</strong> {employee.email}</p>
                                <p><strong>Phone:</strong> {employee.phone}</p>
                                <p><strong>Position:</strong> {employee.position}</p>
                                <p><strong>Department:</strong> {employee.department}</p>
                                <p><strong>Role:</strong> {employee.role}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Leave Status Modal */}
              {showLeaveModal && (
                  <div className="modal show fade d-block" tabIndex="-1" role="dialog">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title">Leave Status</h5>
                                  <button type="button" className="btn-close" onClick={() => setShowLeaveModal(false)}></button>
                              </div>
                              <div className="modal-body text-start">
                                  <p><strong>Total Leaves:</strong> {totalLeaves}</p>
                                  <p><strong>Pending Leaves:</strong> {pendingLeaves}</p>
                                  <p><strong>Taken Leaves:</strong> {takenLeaves}</p>
                              </div>
                              <div className="modal-footer">
                                  <button className="btn btn-secondary" onClick={() => setShowLeaveModal(false)}>Close</button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}
        </div>
    );
};

export default EmployeeProfile;

import React, { useEffect, useState } from 'react';
import jsonData from '../../data/employeeProfiles.json';

const HRDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState({});

    useEffect(() => {
        setEmployees(jsonData);

        // Fetch leave requests on mount
        const fetchLeaveRequests = async () => {
            try {
                const response = await fetch('http://localhost:5000/leaveRequests'); // ✅ Correct endpoint
                if (!response.ok) throw new Error('Failed to fetch leave data');
                const data = await response.json();

                const mapped = {};
                data.forEach((leave) => {
                    if (leave.employee?.id) {
                        mapped[leave.employee.id] = leave;
                    }
                });

                setLeaveRequests(mapped);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        fetchLeaveRequests();
    }, []);

    const handleApproveLeave = async (employeeId) => {
        const leaveRequest = leaveRequests[employeeId];

        if (!leaveRequest) {
            alert('Leave request not found for this employee.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/leaveRequests/${leaveRequest.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'Approved',
                }),
            });

            if (!response.ok) throw new Error('Failed to update leave request');

            const updatedLeave = await response.json();

            setLeaveRequests((prev) => ({
                ...prev,
                [employeeId]: updatedLeave,
            }));

            alert(`Leave approved for ${leaveRequest.employee.firstName}`);
        } catch (error) {
            console.error('Error approving leave:', error);
            alert('Failed to approve leave.');
        }
    };

    const filteredEmployees = employees.filter((e) => e.role === 'employee');

    return (
        <section className='login-bg'>
            <div className="container z-3 position-relative bg-white p-3 shadow-sm rounded">
                <h2 className='text-warning fw-bold'>Employee Management</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Leave</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => {
                            const leave = leaveRequests[employee.id];
                            return (
                                <tr key={employee.id}>
                                    <td>{index + 1}</td>
                                    <td>{employee.firstName} {employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        {leave ? (
                                            leave.status === 'Approved' ? (
                                                <span className="text-success">Approved</span>
                                            ) : (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleApproveLeave(employee.id)}
                                                >
                                                    Approve Leave
                                                </button>
                                            )
                                        ) : (
                                            'No Request'
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default HRDashboard;

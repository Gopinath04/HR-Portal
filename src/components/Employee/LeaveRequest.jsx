import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const LeaveRequest = () => {
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setUserData(loggedInUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!leaveType || !startDate || !endDate || !reason) {
            setMessage('Please fill in all fields.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setMessage('Start date cannot be after end date.');
            return;
        }

        const leaveRequest = {
            leaveType,
            startDate,
            endDate,
            reason,
            employee: {
                id: userData?.id,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email
            },
            status: 'Pending' // You can track approval status later
        };

        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:5000/leaveRequests', leaveRequest);
            console.log('Leave request saved to db.json:', response.data);
            setMessage('Leave request submitted and saved successfully!');
            
            // Reset form
            setLeaveType('');
            setStartDate('');
            setEndDate('');
            setReason('');
        } catch (error) {
            console.error('Error saving leave request:', error);
            setMessage('Failed to submit leave request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className='login-bg'>
            <div className="container z-3 position-relative bg-white p-3 shadow-sm rounded">
                <div className="leave-request">
                    <h2 className='text-warning fw-bold py-3'>Leave Request</h2>
                    {message && <Alert variant="info">{message}</Alert>}
                    {userData ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="leaveType" className="mb-3">
                                <Form.Label>Leave Type</Form.Label>
                                <Form.Select
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                >
                                    <option value="">Select Leave Type</option>
                                    <option value="sick">Sick Leave</option>
                                    <option value="vacation">Vacation Leave</option>
                                    <option value="personal">Personal Leave</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="startDate" className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="endDate" className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="reason" className="mb-3">
                                <Form.Label>Reason</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </Form>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LeaveRequest;

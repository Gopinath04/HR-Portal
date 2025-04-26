// filepath: src/components/HR/EmployeeProfile.js
import React from 'react';

const EmployeeProfile = ({ employee }) => {
  return (
    <div className="card">
      <h5 className="card-header">{employee.name}</h5>
      <div className="card-body">
        <p>Email: {employee.email}</p>
        <p>Role: {employee.role}</p>
      </div>
    </div>
  );
};

export default EmployeeProfile;
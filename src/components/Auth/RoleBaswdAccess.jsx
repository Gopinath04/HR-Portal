import React from 'react';
import { Navigate } from 'react-router-dom'; // Replace Redirect with Navigate

const RoleBasedAccess = ({ children, allowedRoles, userRole }) => {
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />; // Use Navigate instead of Redirect
    }
    return children;
};

export default RoleBasedAccess;
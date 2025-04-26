
import React, { useState } from 'react';

const LeaveRequest = () => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle leave request submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Reason for leave"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LeaveRequest;
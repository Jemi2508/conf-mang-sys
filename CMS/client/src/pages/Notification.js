import React from 'react';
import { useLocation } from 'react-router-dom';

const Notification = () => {
  const location = useLocation();
  const registrationDetails = location.state;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Registration Successful!</h2>
      {registrationDetails ? (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', display: 'inline-block', textAlign: 'left' }}>
          <p><strong>Conference Name:</strong> {registrationDetails.conferenceName}</p>
          <p><strong>Registered By:</strong> {registrationDetails.personName}</p>
          <p><strong>Email:</strong> {registrationDetails.email}</p>
          <p><strong>Registration Date & Time:</strong> {registrationDetails.date}</p>
        </div>
      ) : (
        <p>No registration details available.</p>
      )}
    </div>
  );
};

export default Notification;

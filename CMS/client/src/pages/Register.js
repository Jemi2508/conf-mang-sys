import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Use axios for API calls

const Register = () => {
  const [conferenceName, setConferenceName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationDetails, setRegistrationDetails] = useState(null); // State to store registration details
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const conferenceId = queryParams.get('conferenceId');

    const conferenceMap = {
      '1': 'Tech Innovations 2025',
      '2': 'Healthcare Summit',
      '3': 'AI and Machine Learning',
      '4': 'Business Leadership Conference',
      '5': 'Environmental Sustainability Forum',
    };

    if (conferenceId && conferenceMap[conferenceId]) {
      setConferenceName(conferenceMap[conferenceId]);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const registrationData = {
        conferenceName,
        name,
        email,
        password,
        date: new Date().toLocaleString(), // Add registration date and time
      };

      const response = await axios.post('http://localhost:5000/api/auth/register', registrationData);

      console.log('Server Response:', response.data);
      setRegistrationDetails(registrationData); // Store registration details to display below
    } catch (err) {
      console.error('Registration Error:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleOk = () => {
    navigate('/conferences'); // Navigate to the next page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ marginBottom: '20px', color: '#4CAF50' }}>Register for {conferenceName}</h2>
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <input type="text" placeholder="Conference Name" value={conferenceName} readOnly />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px' }}>
          Register
        </button>
      </form>

      {/* Display registration details below the form */}
      {registrationDetails && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            display: 'inline-block',
            textAlign: 'left',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3>Registration Details</h3>
          <p><strong>Conference Name:</strong> {registrationDetails.conferenceName}</p>
          <p><strong>Registered By:</strong> {registrationDetails.name}</p>
          <p><strong>Email:</strong> {registrationDetails.email}</p>
          <p><strong>Registration Date & Time:</strong> {registrationDetails.date}</p>
          <button
            onClick={handleOk}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;

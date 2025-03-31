import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [userType, setUserType] = useState(''); // State to store user type (Speaker or Seeker)

  // List of quotes
  const quotes = [
    "Leadership is not about being in charge. It is about taking care of those in your charge. - Simon Sinek",
    "The science of today is the technology of tomorrow. - Edward Teller",
    "A conference is a gathering of people who singly can do nothing, but together can decide that nothing can be done. - Fred Allen",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "The best way to predict the future is to create it. - Peter Drucker",
  ];

  // Change the quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [quotes.length]);

  const handleUserTypeSelection = (type) => {
    setUserType(type); // Set the user type (Speaker or Seeker)
  };

  const handleLogin = () => {
    navigate(`/login?userType=${userType}`); // Navigate to the login page with userType
  };

  const handleSignup = () => {
    navigate(`/register?userType=${userType}`); // Navigate to the signup page with userType
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ marginBottom: '20px', color: '#4CAF50' }}>WELCOME TO JEMJOV CONFERENCES</h1>
      <div
        style={{
          border: '2px solid #4CAF50',
          borderRadius: '10px',
          padding: '20px',
          width: '60%',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          marginBottom: '30px',
        }}
      >
        <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#333' }}>{quotes[quoteIndex]}</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>Are you a:</p>
        <button
          onClick={() => handleUserTypeSelection('Speaker')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: userType === 'Speaker' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Speaker
        </button>
        <button
          onClick={() => handleUserTypeSelection('Seeker')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: userType === 'Seeker' ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Seeker
        </button>
      </div>
      {userType && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '16px', marginBottom: '10px', color: '#555' }}>
            You selected: <strong>{userType}</strong>
          </p>
          <table style={{ margin: '0 auto', border: '1px solid #ccc', padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ padding: '10px', fontSize: '18px', color: '#4CAF50' }}>
                  GET STARTED
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>
                  <button
                    onClick={handleSignup}
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Sign Up
                  </button>
                </td>
                <td style={{ padding: '10px' }}>
                  <button
                    onClick={handleLogin}
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      backgroundColor: '#008CBA',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;

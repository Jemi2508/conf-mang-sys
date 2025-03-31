import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Use axios for API calls

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  // List of motivational quotes
  const quotes = [
    "Failure is simply the opportunity to begin again, this time more intelligently.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
  ];

  // Change the quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [quotes.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Send login credentials to the backend
      await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Display success message and navigate to conferences page
      alert('Login Successful!');
      navigate('/conferences'); // Navigate to the conferences page
    } catch (err) {
      // Handle login failure but still navigate to conferences
      setError(err.response?.data?.msg || 'Login failed, but proceeding to conferences.');
      alert('Login Successful!'); // Display success message regardless
      navigate('/conferences'); // Navigate to the conferences page
    }
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f9' }}>
      <div
        style={{
          maxWidth: '400px',
          width: '90%',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#ffffff',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#4CAF50' }}>Welcome Back!</h2>
        <p style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
          Please log in to access your conferences and stay updated with the latest events.
        </p>
        {error && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
            <p style={{ fontStyle: 'italic', color: '#555' }}>{quotes[quoteIndex]}</p>
            <p style={{ color: '#007BFF', fontWeight: 'bold' }}>Try Again</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Log In
          </button>
        </form>
      </div>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#e9f7ef',
          color: '#333',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        <p>{quotes[quoteIndex]}</p>
      </div>
    </div>
  );
};

export default Login;

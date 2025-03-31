import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Conferences = () => {
  const navigate = useNavigate();
  const [conferences, setConferences] = useState([
    {
      _id: '1',
      title: 'Tech Innovations 2025',
      description: 'Explore the latest in technology and innovation.',
      price: 100,
    },
    {
      _id: '2',
      title: 'Healthcare Summit',
      description: 'Discuss advancements in healthcare and medicine.',
      price: 150,
    },
    {
      _id: '3',
      title: 'AI and Machine Learning',
      description: 'Dive deep into AI and machine learning trends.',
      price: 200,
    },
    {
      _id: '4',
      title: 'Business Leadership Conference',
      description: 'Learn from top business leaders around the globe.',
      price: 120,
    },
    {
      _id: '5',
      title: 'Environmental Sustainability Forum',
      description: 'Focus on sustainable practices for a better future.',
      price: 80,
    },
  ]);

  const handleRegister = (conferenceId) => {
    navigate(`/register?conferenceId=${conferenceId}`); // Navigate to the registration page with the conference ID
  };

  return (
    <div>
      <h2>Conferences Available</h2>
      {conferences.map((conference) => (
        <div key={conference._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{conference.title}</h3>
          <p>{conference.description}</p>
          <p>Price: ${conference.price}</p>
          <button
            onClick={() => handleRegister(conference._id)}
            style={{ marginTop: '10px', padding: '5px 15px', fontSize: '14px' }}
          >
            Register for {conference.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Conferences;

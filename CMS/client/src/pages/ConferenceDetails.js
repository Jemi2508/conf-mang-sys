import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ConferenceDetails = () => {
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const res = await axios.get(`/api/conferences/${id}`); // Replace with your API endpoint
        setConference(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load conference details');
        console.error(err);
      }
    };
    fetchConference();
  }, [id]);

  if (!conference) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{conference.title}</h2>
      <p>{conference.description}</p>
      <p>Venue: {conference.venue}</p>
      <p>Start Date: {new Date(conference.startDate).toLocaleDateString()}</p>
       <p>Price: ${conference.price}</p>
      <Link to={`/payment/${conference._id}`}>Proceed to Payment</Link>
    </div>
  );
};

export default ConferenceDetails;

import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Payment Page for Conference ID: {id}</h2>
      {/*  Integrate a payment gateway here (Stripe, PayPal, etc.) */}
      <p>Simulate payment processing...</p>
      <button>Pay Now</button>  {/*  This would trigger the actual payment */}
    </div>
  );
};

export default Payment;

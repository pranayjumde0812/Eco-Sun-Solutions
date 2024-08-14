import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Load your publishable key from the Stripe Dashboard
const stripePromise = loadStripe('your-publishable-key-here');

function Payment() {
  return (
    <div className="container mt-5">
      <h2>Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;

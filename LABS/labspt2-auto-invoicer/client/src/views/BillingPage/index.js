import React from 'react';

// import components here
import StripeElements from './../../components/StripeElements';

// import styles here
import './BillingPage.css';

const BillingPage = () => {
  return (
    <section className="billing-container">
      <StripeElements />
    </section>
  );
};

export default BillingPage;

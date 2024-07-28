import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';
import NavBar from '../components/SignedInNav';
import '../assets/css/PaymentPage.css';

const PaymentPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState({});

  const handlePaymentOptionChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleTokenAmountChange = (e) => {
    setTokenAmount(e.target.value);
  };

  const handleTransactionDetailsChange = (e) => {
    setTransactionDetails({ ...transactionDetails, [e.target.name]: e.target.value });
  };

  const handleInvest = async () => {
    try {
      // Make API call to save investment details
      await axios.post(`/api/projects/${id}/invest`, {
        paymentMethod,
        tokenAmount,
        transactionDetails,
      });

    //   // Trigger confetti animation
    //   confetti({
    //     particleCount: 100,
    //     spread: 70,
    //     origin: { y: 0.6 },
    //   });

      // Prepare Twitter share message
      const twitterMessage = `I just invested in project ${project.name} by ${project.filmmaker.firstName} ${project.filmmaker.lastName}. Feeling great to be on this journey! Want to start your film investment journey too? Visit Finamu.com today! #film #investment #Finamu`;

      // Redirect to Twitter share
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`;
      window.open(twitterUrl, '_blank');
    } catch (error) {
      console.error('Error processing investment:', error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="payment-page">
        <h2>Invest in {project ? project.name : 'Project'}</h2>
        <div>
          <label htmlFor="payment-method">Choose Payment Method:</label>
          <select id="payment-method" value={paymentMethod} onChange={handlePaymentOptionChange}>
            <option value="">Select an option</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="crypto">Cryptocurrency</option>
          </select>
        </div>
        
        {paymentMethod === 'credit_card' && (
          <div className="payment-details">
            <h3>Enter Credit Card Information</h3>
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleTransactionDetailsChange} />
            <input type="text" name="expiryDate" placeholder="Expiry Date" onChange={handleTransactionDetailsChange} />
            <input type="text" name="cvv" placeholder="CVV" onChange={handleTransactionDetailsChange} />
          </div>
        )}
        
        {paymentMethod === 'bank_transfer' && (
          <div className="payment-details">
            <h3>Bank Transfer Details</h3>
            <p>Account Number: 0004452752711528</p>
            <p>Bank Name: Exim Bank Canada</p>
            <input type="text" name="transactionCode" placeholder="Enter Transaction Code" onChange={handleTransactionDetailsChange} />
          </div>
        )}
        
        {paymentMethod === 'mobile_money' && (
          <div className="payment-details">
            <h3>Mobile Money Details</h3>
            <p>Mobile Money Number: +254 732178426</p>
            <input type="text" name="transactionCode" placeholder="Enter Transaction Code" onChange={handleTransactionDetailsChange} />
          </div>
        )}
        
        {paymentMethod === 'crypto' && (
          <div className="payment-details">
            <h3>Cryptocurrency Details</h3>
            <p>Wallet Address: 0x5FEF7FD8993E86A2Dc89f5FA6D0e8f65De7FEF4f</p>
            <input type="text" name="transactionCode" placeholder="Enter Transaction Code" onChange={handleTransactionDetailsChange} />
          </div>
        )}

        <div>
          <label htmlFor="token-amount">Number of Tokens:</label>
          <input type="number" id="token-amount" value={tokenAmount} onChange={handleTokenAmountChange} />
          <p>Price per Token: USD 10</p>
        </div>

        <button className="btn btn-primary" onClick={handleInvest}>Invest</button>
      </div>
    </div>
  );
};

export default PaymentPage;

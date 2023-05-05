import React, { useState } from 'react';
import './AfterLogin.css';
import SelectService from './SelectService';
import OrderList from './OrderList';

const AfterLogin = ({ email }) => {
  const [showSelectService, setShowSelectService] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const onPlaceOrder = () => {
    setShowSelectService(true);
    displayOrderHistory()
  };

  const displayOrderHistory = () => {
    if(showOrderHistory === false){
        setShowOrderHistory(true);
    }
    else{
        setShowOrderHistory(false);
    }
  };


  const onLogout = () => {
    // Handle logout functionality here
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Welcome, {email}!</h1>
      {!showSelectService && (
        <div className="login-buttons">
          <button className="login-button" onClick={onPlaceOrder}>
            Place Order
          </button>
          <button className="login-button" onClick={displayOrderHistory}>
            OrderHistory
          </button>
          <button className="login-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
      {showSelectService && <SelectService email={email} />}
      {showOrderHistory && <OrderList email={email} />}
    </div>
  );
};

export default AfterLogin;

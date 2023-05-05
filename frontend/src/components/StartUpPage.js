import React, { useState } from 'react';
import CustomerRegistration from './CustomerRegistration';
import ServiceProviderRegistration from './ServiceProviderRegistration';
import ListOfServices from './ListOfServices';
import Login from './Login';
import './StartUpPage.css';

const StartUpPage = () => {
  const [showCustomerRegistration, setShowCustomerRegistration] = useState(false);
  const [showServiceProviderRegistration, setShowServiceProviderRegistration] = useState(false);
  const [showListOfServices, setShowListOfServices] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCustomerRegistration = () => {
    setShowCustomerRegistration(true);
    setShowServiceProviderRegistration(false);
    setShowListOfServices(false);
    setShowLogin(false);
  };

  const handleServiceProviderRegistration = () => {
    setShowCustomerRegistration(false);
    setShowServiceProviderRegistration(true);
    setShowListOfServices(false);
    setShowLogin(false);
  };

  const handleListOfServices = () => {
    setShowCustomerRegistration(false);
    setShowServiceProviderRegistration(false);
    setShowListOfServices(true);
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowCustomerRegistration(false);
    setShowServiceProviderRegistration(false);
    setShowListOfServices(false);
    setShowLogin(true);
  }

  return (
    <div className="startup-container">
       {!showCustomerRegistration && !showServiceProviderRegistration && !showListOfServices && !showLogin && (
      <h1 className="startup-heading">Welcome to HomeServices!</h1>
       )}
      {!showCustomerRegistration && !showServiceProviderRegistration && !showListOfServices && !showLogin && (
        <div className="startup-buttons">
          <button className="startup-button" onClick={handleCustomerRegistration}>
            Customer Registration
          </button>
          <button className="startup-button" onClick={handleServiceProviderRegistration}>
            Service Provider Registration
          </button>
          <button className="startup-button" onClick={handleListOfServices}>
            List of Services
          </button>
          <button className="startup-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {showCustomerRegistration && <CustomerRegistration />}
      {showServiceProviderRegistration && <ServiceProviderRegistration />}
      {showListOfServices && <ListOfServices />}
      {showLogin && <Login />}
    </div>
  );
};

export default StartUpPage;

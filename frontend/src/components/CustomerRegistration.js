import React, { useState } from 'react';
import './CustomerRegistration.css';

const CustomerRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create JSON object from form data
    const customerData = {
      email,
      password,
      firstName,
      lastName,
      address: {
        line1: addressLine1,
        line2: addressLine2,
        city,
        state,
        zipCode,
        phone,
      },
    };

     fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: 500 Internal Server Error');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response from API:', data);
        // Handle API response as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert('Email Already Exists');
        // Handle errors
      });
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
      <h1 className="registration-heading">Customer Registration</h1>
        <label>
          Email Address:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <h2 className="address-heading">Address</h2>
        <label>
          Address Line 1:
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address Line 2:
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Zip Code:
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="registration-button">
          Register
        </button>
      </form>
      
    </div>
  );
};

export default CustomerRegistration;


import React, { useState, useEffect } from 'react';
import './PlaceOrder.css';

const PlaceOrder = ({ email, selectedProvider, onClose }) => {
//   const [services, setServices] = useState([]);
 // const [selectedService, setSelectedService] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [totalPayment, setTotalPayment] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  let selectedService = ''
  useEffect(() => {
    fetch('/api/services')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      })
    //   .then((data) => setServices(data))
      .catch((error) => setError(error.message));

    fetch('/api/paymentmethods')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }
        return response.json();
      })
      .then((data) => setPaymentMethods(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      customer_email: email,
      provider_email: selectedProvider.email,
      service_id: selectedService,
      method_name: selectedPaymentMethod,
      total_payment: parseFloat(totalPayment),
      discount: parseFloat(discount),
    };

    fetch('/api/placeorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful order placement as needed
        console.log('Order placed:', data);
        onClose(); // Close the PlaceOrder component
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="place-order-container">
      <h1 className="place-order-heading">Place Order</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>

        <br />
        <label>
          Payment Method:
          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select a payment method</option>
            {paymentMethods.map((method) => (
              <option key={method.method_id} value={method.method_name}>
                {method.paymentMethod}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Total Payment:
          <input
            type="number"
            value={totalPayment}
            onChange={(e) => setTotalPayment(parseFloat(e.target.value))}
            required
          />
        </label>
        <br />
        <label>          Discount:
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
          />
        </label>
        <br />
        <button type="submit" className="place-order-button">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;


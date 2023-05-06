import React, { useState, useEffect } from 'react';
import './OrderList.css';

const OrderList = ({ email }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
  
    fetch(`/api/orderdetails?customer_email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false)); // Set loading to false after data is fetched
  }, [email, orders, loading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="order-list-container">
      <h1>Order List</h1>
      {orders.length === 0 ? (
        <div>No order history.</div>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Email</th>
              <th>Provider Name</th>
              <th>Payment Method</th>
              <th>Total Payment</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_email}</td>
                <td>{order.provider_name}</td>
                <td>{order.payment_method}</td>
                <td>{order.total_payment}</td>
                <td>{order.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;

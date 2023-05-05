import React, { useState, useEffect } from 'react';
import './ServiceProviderRegistration.css';

const ServiceProviderRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Unable to fetch services.');
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the service ID based on the selected service name
  //  const selectedService = services.find((service) => service.service === serviceName);
    // const serviceId = selectedService ? selectedService.services_id : null;

    // Create JSON object from form data
    const serviceProviderData = {
      firstName,
      lastName,
      email,
      serviceName,
    };

    // Send serviceProviderData to your API endpoint using fetch or Axios
    fetch('/api/registerServiceProvider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceProviderData),
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
        setError(error.message);
        console.error('Error:', error);
        // Handle errors
      });
  };

  return (
    <div className="registration-container">
      <h1 className="registration-heading">Service Provider Registration</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Service:
          <select
            className="service-dropdown"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.services_id} value={service.service}>
                {service.service}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" className="registration-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default ServiceProviderRegistration;

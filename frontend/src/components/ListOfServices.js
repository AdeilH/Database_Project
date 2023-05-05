import React, { useEffect, useState } from 'react';
import './ListOfServices.css';

const ListOfServices = () => {
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
        setServices(data); // Assuming the API response is an array of services
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="services-container">
      <h1 className="services-heading">List of Services</h1>
      {error && <div className="error-message">{error}</div>}
      {services.length === 0 && !error && <div className="empty-message">No services available.</div>}
      {services.length > 0 && (
        <ul className="services-list">
          {services.map((service) => (
            <li key={service.services_id} className="service-item"> {/* Update the key and service property name */}
              {service.service}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListOfServices;

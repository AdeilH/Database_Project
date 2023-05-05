import React, { useState, useEffect } from 'react';
import './SelectService.css';
import PlaceOrder from './PlaceOrder';

const SelectService = ({ email }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);

  // Fetch services from your API (replace with actual API endpoint)
  useEffect(() => {
    fetch('/api/services')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      })
      .then((data) => setServices(data))
      .catch((error) => setError(error.message));
  }, []);

  // Fetch service providers when selectedService changes
  useEffect(() => {
    if (selectedService) {
      setLoading(true);
      fetch(`/api/serviceproviders?service=${selectedService}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch service providers');
          }
          return response.json();
        })
        .then((data) => setServiceProviders(data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    } else {
      // Reset service providers when no service is selected
      setServiceProviders([]);
    }
  }, [selectedService]);

  const handleProviderSelection = (provider) => {
    setSelectedProvider(provider);
  };

  const handleOrderDetails = () => {
    if (selectedProvider) {
      setShowPlaceOrder(true);
    }
  };

  const handlePlaceOrderClose = () => {
    setShowPlaceOrder(false);
  };

  return (
    <div className="select-service-container">
      <label>
        Service Required:
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.service_id} value={service.service_id}>
              {service.service}
            </option>
          ))}
        </select>
      </label>
      {selectedService && (
        <div className="service-providers-container">
          <h3>Service Providers:</h3>
          {loading ? (
            <p>Loading service providers...</p>
          ) : serviceProviders.length > 0 ? (
            <ul>
              {serviceProviders.map((provider) => (
                <li key={provider.provider_id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedProvider === provider}
                      onChange={() => handleProviderSelection(provider)}
                    />
                    {provider.firstName} {provider.lastName} - {provider.email}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No service providers available for the selected service.</p>
          )}
          <div className="order-details-button-container">
            <button
              className="order-details-button"
              onClick={handleOrderDetails}
              disabled={!selectedProvider}
            >
              Order Details
            </button>
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {showPlaceOrder && (
        <PlaceOrder
          email={email}
          selectedProvider={selectedProvider}
          onClose={handlePlaceOrderClose}
          />
          )}
          </div>
          );
          };
          
          export default SelectService;

import React, { useState } from 'react';
import axios from 'axios';
import './Addcustomer.css';

const Addcustomer = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    gender: '',
    address: '',
    newsletterSubscription: false,
  });

  const [isCustomerIdValid, setIsCustomerIdValid] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'customerId' && value) {
      try {
        const response = await axios.get(`http://localhost:8080/validateCustomerId/${value}`);
        setIsCustomerIdValid(response.data);
      } catch (error) {
        console.error('Error validating customer ID:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!formData.gender) {
      return;
    }

    if (!isCustomerIdValid) {
      alert('Customer ID is already in use. Please choose a different ID.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/addcustomer', formData);
      console.log('Customer added:', response.data);
      alert('Customer added successfully');

      setIsCustomerIdValid(true);
      setIsFormSubmitted(false); 
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer');
    }
  };

  const handleClear = () => {
    setFormData({
      customerId: '',
      customerName: '',
      gender: '',
      address: '',
      newsletterSubscription: false,
    });
    setIsFormSubmitted(false);
  };

  return (
    <div className="form-container">
      <h2>Save Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Enter ID:</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          />
          {!isCustomerIdValid && <span className="error-text">Customer ID is already taken</span>}
        </div>

        <div className="form-group">
          <label htmlFor="customerName">Enter Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          {isFormSubmitted && !formData.gender && (
            <span className="error-text">Gender is required.</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <select
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          >
            <option value="">Select an address</option>
            <option value="Koti">Koti</option>
            <option value="Gachibowli">Gachibowli</option>
            <option value="KPHB">KPHB</option>
            <option value="Ameerpet">Ameerpet</option>
          </select>
        </div>
        <div className="form-group-checkbox">
          <input
            type="checkbox"
            name="newsletterSubscription"
            checked={formData.newsletterSubscription}
            onChange={handleChange}
          />
          <label>Subscribe to Newsletter</label>
        </div>
        <div className="form-group-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Addcustomer;






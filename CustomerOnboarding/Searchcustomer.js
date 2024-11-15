import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './Searchcustomer.css';

const Searchcustomer = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
  });

  const [customerDataList, setCustomerDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/getcustomer/${formData.customerId}/${formData.customerName}`
      );

      if (response.data && Object.keys(response.data).length > 0) {
        console.log('Customer found:', response.data);
        setCustomerDataList([...customerDataList, response.data]);
      } else {
        alert('Customer not found. Please check the ID or name and try again.');
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      alert('Failed to find customer');
    }

    setFormData({
      customerId: '',
      customerName: '',
    });
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customerDataList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'customer_data.xlsx');
  };

  return (
    <div>
      <div className="form-container">
        <h2>Search Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerId">Customer ID:</label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-serach">
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      <div className="customertable">
        {customerDataList.length > 0 && (
          <div className="table-container">
            <h1>Customer Details</h1>
            <table border="1">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Newsletter Subscription</th>
                </tr>
              </thead>
              <tbody>
                {customerDataList.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.customerId}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.address}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.newsletterSubscription ? 'Subscribed' : 'Not Subscribed'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="excel" onClick={handleExportToExcel}>Extract to Excel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchcustomer;

import React, { useState } from 'react';
import './style.css'

function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Prepare the data for submission
    const data = {
      firstName,
      lastName,
      age,
      address,
      mobileNumber,
      message
    };
   console.log(data)
    try {
      const response = await fetch('http://localhost:8081/userDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        alert('User details submitted successfully!');
        setFirstName('');
        setLastName('');
        setAge('');
        setAddress('');
        setMobileNumber('');
        setMessage('');
      } else {
        alert('Error submitting user details. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="user-form-container">
      <h1>User Details Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required /><br />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required /><br />

        <label htmlFor="address">Address:</label>
        <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea><br />

        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required /><br />

        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea><br />

        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </div>
  );
}

export default UserForm;

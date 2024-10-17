import React, { useState, useEffect } from 'react';
import Header from './components/Header';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');  
  const [billingAddress, setBillingAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    //send token and get user info
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  
          },
        });

        //parse response
        const data = await response.json();
        if (response.ok) {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);  
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log(error.message)
        setErrorMessage('Error fetching user data');
      }
    };

    fetchUserProfile();
  }, []);

  //submit changes routine
  const handleSubmit = async (e) => {
    e.preventDefault();

    //send token along with updated user info
    try {
      const response = await fetch('http://localhost:3001/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          password: password, 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Profile updated successfully');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Error updating profile');
    }
  };

  return (
    <div className="edit-profile-container">
      <Header />

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email (Cannot be changed):</label>
          <input type="email" id="email" value={email} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address:</label>
          <input 
            type="text" 
            id="billingAddress" 
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
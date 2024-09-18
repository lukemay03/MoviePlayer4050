import React from 'react';
import Header from './Header';


function EditProfile() {
  return (
    <div className="edit-profile-container">
      <Header></Header>
      
      <form className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email (Cannot be changed):</label>
          <input type="email" id="email" name="email" value="user@example.com" readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter new password" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" placeholder="Enter your address" />
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
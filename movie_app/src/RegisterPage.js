import React, { useState } from 'react';
import Header from './components/Header';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Step 1: Create a state variable for the email
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  // Step 2: Handle change events for the input field
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update state with the current input value
  };

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Navigate to the reg-confirm page with the email state
    console.log("Email being sent:", email); // Log email to verify
    if (isSubmitting) return; // Prevent further submissions
    setIsSubmitting(true); // Disable the button
    navigate("/reg-confirm", { state: { email: email } }); // Pass the existing email to the next page
  };

  return (
    <div className="register-container">
      <Header></Header>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name"/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={email}
                 onChange={handleEmailChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"/>
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password"/>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number"/>
        </div>

        <button type="submit" className="register-button">Register</button>

        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;



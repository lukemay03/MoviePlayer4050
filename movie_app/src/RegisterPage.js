import React from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {
  const [inputs, setInputs] = useState({
    role:'user',
    status:'Inactive'
  })

  const [promotions, setPromotion] = useState(false);

  const navigate = useNavigate();


  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/user/check-email?email=${email}`);
      const data = await response.json();

      if(data.exists) {
        alert(data.message);
        return true; // Email already exists
      }
      return false; // email does not exist
    } catch (error) {
      console.error("Error checking email:", error);
      alert("An error occurred while checking email availability.");
      return true; // Assume email exists to prevent registration
    }
  };

  const handleInput = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (e) => {
     if (inputs.password !== inputs.confirm_password) {
      alert("Passwords do not match");
    } else {
      e.preventDefault();
      const emailExists = await checkEmailExists(inputs.email);
      if(emailExists) {
        return;
      }
      if (promotions === false) {
        inputs.registeredforpromo = "False";
      } else {
        inputs.registeredforpromo = "True";
      }
      const nameArray = inputs.name.split(" ");
      inputs.first_name = nameArray[0];
      inputs.last_name = nameArray[1];
      try {

        const result = await fetch('http://localhost:3001/user/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        });

        if (!result.ok) { 
          const errorData = await result.json();
          alert(errorData.message); // Display error if email already exists
          return;
        }

        navigate('/reg-confirm', { state: { email: inputs.email} });

      } catch (error) {
        console.error("An error occurred during registration:", error);
        alert("An error occurred.");
      }
      
    }
   
   
   
  };
  return (
      <div className="register-container">
        <Header></Header>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" value={inputs.name || ""}
                   onChange={handleInput} required/>
          </div>


          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={inputs.email || ""}
                   onChange={handleInput} required/>
          </div>


          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password"
                   value={inputs.password || ""} onChange={handleInput} required/>
          </div>


          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password"
                   value={inputs.confirm_password || ""} onChange={handleInput} required/>
          </div>


          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={inputs.phone || ""}
                   onChange={handleInput} required/>
          </div>

          <div className="form-group">
            <label htmlFor="address">Billing Address:</label>
            <input type="address" id="address" name="address" placeholder="Enter your billing address" value={inputs.address || ""}
                   onChange={handleInput} required/>
          </div>

          <div className="form-group">
            <label htmlFor="promotions">Receive Promotions:</label>
            <input
                type="checkbox"
                id="promotions"
                checked={promotions}
                onChange={(e) => setPromotion(e.target.checked)}
            />
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





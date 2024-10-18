import React from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';






function RegisterPage() {
  const [inputs, setInputs] = useState({
    role:'User',
    status:'Active'
  })


  const navigate = useNavigate();


  const handleInput = (event) => {
    setInputs(prev => ({...prev, [event.target.name]: event.target.value}))
  }


 


 
 


  const handleSubmit = async (e) => {
     if (inputs.password !== inputs.confirm_password) {
      alert("Passwords do not match");
    } else {
      e.preventDefault();
      const nameArray = inputs.name.split(" ");
      inputs.first_name = nameArray[0];
      inputs.last_name = nameArray[1];
      const result = await fetch('http://localhost:3001/user/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    navigate('/RegistrationConfirmation');
    }
   
   
   
  };
  return (
    <div className="register-container">
      <Header></Header>
     
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" value={inputs.name || ""} onChange={handleInput} required/>
        </div>


        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={inputs.email || ""} onChange={handleInput} required/>
        </div>


        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={inputs.password || ""} onChange={handleInput} required/>
        </div>


        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password" value={inputs.confirm_password || ""} onChange={handleInput} required/>
        </div>


        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={inputs.phone || ""}onChange={handleInput} required/>
        </div>


        <button type="submit" className="register-button" >Register</button>


        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}


export default RegisterPage;





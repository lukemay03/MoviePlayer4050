import React, { useState } from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  
        },
      });

      //parse response
      const userdata = await response.json();
      if (response.ok) {
        //console.log('user data is ' + userdata);
        setRole(userdata.role);
        //console.log(role)
        return userdata;
      } else {
        setErrorMessage(userdata.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage('Error fetching user data');
    }
  };
  //on sumbit send email and pass for server authentication and user receives token
  const handleSubmit = async (e) => {
    e.preventDefault();

    //post request to server with email and password
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      //parse the response
      const data = await response.json();
      //if authenticated, store token for future requests and load home page
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const userdata = await fetchUserProfile();
        //console.log(userdata.role);
        localStorage.setItem('role', userdata.role);
        localStorage.setItem('id', userdata.user_id);
        console.log(userdata)
        //console.log(typeof(userdata))
        //console.log(localStorage.getItem('role'));
        //console.log(userdata['role'] === 'admin');
        //console.log('role is' + role);
        if (userdata.role === 'user') {
          navigate('/');
        } else if (userdata.role === 'admin') {
          navigate('/admin-main');
        }
      } else {
        setErrorMessage(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <Header/>
      
      <form className="login-form" noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="login-button">Login</button>

        <p>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
        <p>
          <a href="/forgot-pass">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

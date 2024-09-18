import React from 'react';
import Header from './components/Header';


function LoginPage() {
  return (
    <div className="login-container">
    <Header></Header>
      
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="login-button">Login</button>

        <p>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;



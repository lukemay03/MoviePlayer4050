import React from 'react';
import Header from './components/Header';
import {Link} from 'react-router-dom';



function RegistrationConfirm() {
  return (
    <div className="register-container">
      <Header></Header>
      <div class="regConfirm">
        <h1> Thank you for Registering! </h1>
        <h2> Check your e-mail for a confirmation.</h2>
      </div>
    </div>
  );
}

export default RegistrationConfirm;
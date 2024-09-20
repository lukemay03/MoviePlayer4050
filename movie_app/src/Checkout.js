import React from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';


function Checkout() {
  return (
    <div className="ticket-select">
    <Header></Header>
    <div class="regConfirm">
       <h3>order details here</h3>
      <Link to="/ticket-select"><button>Update Cart</button></Link>
      <Link to="/"><button>Confirm</button></Link>
    </div>
  </div>
  );
}

export default Checkout;
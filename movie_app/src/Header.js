import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <h1>Cinema E-Booking System</h1>
      <nav className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/">Checkout</Link>
        <Link to="/">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;
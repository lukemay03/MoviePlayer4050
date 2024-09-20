import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <h1><Link to="/">Cinema E-Booking Site</Link></h1>
      <nav className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/edit-profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;
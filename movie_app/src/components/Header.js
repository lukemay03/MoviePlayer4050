import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    //clear the token
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <header className="site-header">
      <h1><Link to="/">Cinema E-Booking Site</Link></h1>
      <nav className='nav-links'>
      {token ? (
      <>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/edit-profile">Edit Profile</Link>
      </>
        ) : (
      <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
      </>
        )}
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
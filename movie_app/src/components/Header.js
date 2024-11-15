import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  function clearStorage() {
    let session = sessionStorage.getItem('register');
    if (session == null) {
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    }
    sessionStorage.setItem('register', 1);
  }
  window.addEventListener('load', clearStorage);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    navigate('/logout');
  };

  const handleCartClick = () => {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      const { name } = JSON.parse(cartData);
      navigate(`/checkout/${name}`, { state: JSON.parse(cartData) });
    } else {
      alert('Your cart is empty.');
    }
  };

  return (
    <header className="site-header">
      <h1><Link to="/">Cinema E-Booking Site</Link></h1>
      <nav className='nav-links'>
        {role === 'admin' ? (
          <>
            {token && (
              <>
                <Link to="/admin-main"><button>Admin</button></Link>
                <button onClick={handleLogout}>Logout</button>
                <Link to="/edit-profile">Edit Profile</Link>
              </>
            )}
            {!token && (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </>
        ) : (
          <>
            {token && (
              <>
                <button onClick={handleLogout}>Logout</button>
                <Link to="/edit-profile">Edit Profile</Link>
              </>
            )}
            {!token && (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </>
        )}
        <Link to="/">Home</Link>
        <button onClick={handleCartClick}>Cart</button>
      </nav>
    </header>
  );
}

export default Header;


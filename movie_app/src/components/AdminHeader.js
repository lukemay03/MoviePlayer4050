import React from 'react';
import { Link } from 'react-router-dom';

function AdminHeader() {
    return (
        <header className="site-header">
            <h1>Admin: Cinema E-Booking System</h1>
            <nav className='nav-links'>
                <Link to="/">Home</Link>
                <Link to="/edit-profile">Profile</Link>
            </nav>
        </header>
    );
}

export default AdminHeader;
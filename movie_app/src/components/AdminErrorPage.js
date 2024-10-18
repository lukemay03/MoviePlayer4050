import React from 'react';
import { Link } from 'react-router-dom';

function AdminErrorPage() {
    return (
        <header className="site-header">
            <h1>Sorry you must be a Admin to access this page</h1>
            <nav className='nav-links'>
                <Link to="/">User Home</Link>
            </nav>
        </header>
    );
}

export default AdminErrorPage;
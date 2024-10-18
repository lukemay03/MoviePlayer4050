import React from 'react';
import { Link } from 'react-router-dom';

function AdminErrorPage() {
    return (
        <header className="site-header">
            <h1>Not a admin</h1>
            <nav className='nav-links'>
                <Link to="/">User Home</Link>
            </nav>
        </header>
    );
}

export default AdminErrorPage;
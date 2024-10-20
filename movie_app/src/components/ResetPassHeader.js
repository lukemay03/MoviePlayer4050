import React from 'react';
import { Link } from 'react-router-dom';

function ResetPassHeader() {
    const token = localStorage.getItem('token');

    return (
        <header className="site-header">
            <h1>Cinema E-Booking Site</h1>
        </header>
    );
}


export default ResetPassHeader;

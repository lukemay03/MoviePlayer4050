import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

function AdminMain() {
    return (

        <body>
        <AdminHeader></AdminHeader>
        <Link to="/manage-movies">
            <button>Manage Movies</button>
        </Link>

        <Link to="/manage-promotions">
            <button>Manage Promotions</button>
        </Link>

        <Link to="/manage-users">
            <button>Manage Users</button>
        </Link>

        <Link to="/">
            <button>User Home</button>
        </Link>
        </body>
    );
}

export default AdminMain;
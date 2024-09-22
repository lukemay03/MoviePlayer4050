import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

function AdminMain() {
    return (

        <div className="admin-option-container">
        <AdminHeader></AdminHeader>

        <Link to="/manage-movies">
            <button>Manage Movies and Promotions</button>
        </Link>

        <Link to="/manage-users">
            <button>Manage Users</button>
        </Link>
        <Link to="/">
            <button>User Home</button>
        </Link>
        </div>
    );
}

export default AdminMain;
import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

function ManageUsers() {
    return (
        <body>
        <AdminHeader></AdminHeader>
        <div>
            <Link to="/manage-movies">
                <button>Manage Movies</button>
            </Link>

            <Link to="/manage-promotions">
                <button>Manage Promotions</button>
            </Link>

            <Link to="/manage-users">
                <button>Manage Users</button>
            </Link>
        </div>
        <form className="User-list">
            <div>
            <p>User 1</p>
            <p>Password</p>
            <button>Edit User</button>
            </div>

        </form>


        </body>
    );
}

export default ManageUsers;

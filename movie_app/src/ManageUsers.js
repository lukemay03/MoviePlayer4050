import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import AdminErrorPage from './components/AdminErrorPage';

function ManageUsers() {
    const role = localStorage.getItem('role');
    if(role && role === 'admin') {
        return (
            <body>
            <AdminHeader></AdminHeader>
            <div>
                <Link to="/manage-movies"><button>Manage Movies and Promotions</button></Link>
                <Link to="/manage-users"><button>Manage Users</button></Link>
            </div>
                <div className="search-bar">
                    <input name="text" placeholder="Search for users by email..."></input>
                    <button>Search</button>
                </div>
            <form className="User-list">

                <div>
                <p>User 1</p>
                <p>Password</p>
                <Link to="/edit-user">
                    <button>Edit User</button>
                </Link>
                </div>

            </form>


            </body>
        );
    } else {
        return (
            <AdminErrorPage></AdminErrorPage>
        );
    }
}

export default ManageUsers;

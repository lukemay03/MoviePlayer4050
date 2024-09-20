import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './AdminHeader';

function EditMovie() {
    return (
        <body>
        <AdminHeader></AdminHeader>
        {/*<p>This is the Edit movie page</p>*/}
        <Link to="/manage-movies">
            <button>Manage Movies</button>
        </Link>

        <Link to="/manage-promotions">
            <button>Manage Promotions</button>
        </Link>

        <Link to="/manage-users">
            <button>Manage Users</button>
        </Link>

        </body>
    );
}

export default EditMovie;
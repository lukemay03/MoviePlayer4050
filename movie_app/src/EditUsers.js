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
<form className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Kong Fu Panda" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email (Cannot be changed):</label>
          <input type="email" id="email" name="email" value="user@example.com" readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Change Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="123-456-7890" />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Change Password:</label>
          <input type="password" id="password" name="password" placeholder="Change Password" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" placeholder="2024 Fake Street" />
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>


        </body>
    );
}

export default ManageUsers;
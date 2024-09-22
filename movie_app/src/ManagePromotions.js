import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';


function ManagePromotions() {
  const location = useLocation();
  const {state} = location || {};
  const {image,name} = state || {};

    return (
        <body>
        <AdminHeader></AdminHeader>
        <div>
          <Link to="/manage-movies"><button>Manage Movies and Promotions</button></Link>
          <Link to="/manage-users"><button>Manage Users</button></Link>
        </div>
         <div className="regConfirm">
         <h3> Managing Promotions For: Shrek{name}</h3>

              <form className="Edit-form">
                <div className="form-group">
                  <label htmlFor="Name">Change Discount:</label>
                  <input name="Dpercent" placeholder="Current dicount = 0%" />
                </div>
                <div className="form-group">
                  <label htmlFor="Name">Date for discount:</label>
                  <input name="Ddate" placeholder="Date 10/10/2010" />
                 </div>

                <div className="form-group">
                   <label htmlFor="requirecode">Require Code:</label>
                   <button>yes</button>
                   <button>no</button>
                   <input name="Dcode" placeholder="Enter code if yes" />
                </div>

                <div className="form-group">
                  <label htmlFor="Release Email to update users">Release Email to update users and Finalize Channges:</label>
                  <button type="submit">yes</button>
                  <button type="submit">no</button>
                </div>

           </form>

          </div>

        </body>
    );
}

export default ManagePromotions;

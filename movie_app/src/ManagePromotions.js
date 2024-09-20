import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

function ManagePromotions() {
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
         <div className="movie">
                    <iframe src="https://www.youtube.com/embed/sampleTrailer4" title="Movie Trailer"></iframe>
                    <h3>Movie Title 4</h3>
                    <p>Release Date: November 2024</p>
                    <button>Edit Movie</button>

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

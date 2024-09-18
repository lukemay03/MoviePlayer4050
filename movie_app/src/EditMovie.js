import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './AdminHeader';

function EditMovie() {
    return (
        <div className="edit-movie-container">
            <AdminHeader></AdminHeader>

            <form className="edit-movie-form">
                <div className="form-group">
                    <label htmlFor="movie-name">Movie Name:</label>
                    <input type="text" id="name" name="movie-name" placeholder="Old Movie Name" />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input type="text" id="text" name="rating" value="Old Rating" />
                </div>

                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
        );
        }

        export default EditMovie;
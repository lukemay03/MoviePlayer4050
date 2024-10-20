import React, { useState, useEffect } from 'react';
import ResetPassHeader from './components/ResetPassHeader';
import {Link, useLocation, useNavigate} from 'react-router-dom';

function ResetPassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    localStorage.setItem('token', token);

    useEffect(() => {
        //send token and get user info
        const fetchUserProfile = async () => {
            try {
                console.log("Attempting to get profile with token: " + localStorage.getItem('token'));
                const response = await fetch('http://localhost:3001/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                //parse response
                const data = await response.json();
                if (!response.ok) {
                    setErrorMessage(data.message || 'An error occurred');
                }
            } catch (error) {
                console.log(error.message)
                setErrorMessage('Error fetching user data');
            }
        };
        fetchUserProfile();
    }, []);

    //submit changes routine
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            //send token along with updated user info
            try {
                const response = await fetch('http://localhost:3001/user/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        password: password,
                    }),
                });
                const data = await response.json();
                localStorage.removeItem('token');
                window.history.replaceState(null, '', window.location.pathname);
                navigate("/reset-pass-confirm");
                if (response.ok) {
                    setSuccessMessage('Password updated successfully');
                } else {
                    setErrorMessage(data.message);
                }
            } catch (error) {
                setErrorMessage('Error updating profile');
            }
        }
    };

    return (
        <div className="edit-profile-container">
            <ResetPassHeader />

            <form className="form" onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" className="save-button">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
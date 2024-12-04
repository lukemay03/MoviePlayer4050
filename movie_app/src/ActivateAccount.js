import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import {Link, useLocation, useNavigate} from 'react-router-dom';


function ActivateAccount() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    localStorage.setItem('token', token);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:3001/user/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            //parse response
            const data = await response.json();
            if (!response.ok) {
                console.log('An error occurred.');
            }
            setEmail(data.email);
        } catch (error) {
            console.log(error.message)
        }
    };

    const activateAccount = async () => {
        try {
            console.log('email: ', email);
            const response = await fetch('http://localhost:3001/activate-account', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email : email}),
            });
            //parse the response
            const data = await response.text();
            if (response.ok) {
                console.log('Account Activated');
            } else {
                console.error('Failed to activate account:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        // Fetch user profile on component mount
        fetchUserProfile();
    }, []);

    useEffect(() => {
        // Activate account when email is updated
        if (email) {
            activateAccount();
        }
    }, [email]); // Dependency ensures activateAccount is called when email updates


    return (
        <div className="register-container">
            <Header />
            <div className="regConfirm">
                <h1>Account Activated</h1>
                <h2>Welcome to Movie Player Co!</h2>
            </div>
        </div>
    );
}

export default ActivateAccount;
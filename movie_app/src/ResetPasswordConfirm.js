import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

function ResetPasswordConfirm() {
    const location = useLocation();

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

        return (
        <div className="register-container">
            <Header />
            <div className="regConfirm">
                <h1>Password Reset</h1>
                <h2>Login with your new password to continue.</h2>
            </div>
        </div>
    );
}

export default ResetPasswordConfirm;
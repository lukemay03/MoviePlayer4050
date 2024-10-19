import React, { useEffect } from 'react';
import Header from './components/Header';

function ResetPasswordConfirm() {
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
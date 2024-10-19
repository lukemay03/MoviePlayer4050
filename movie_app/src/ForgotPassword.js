import React from 'react';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/forgot-pass-confirm", { state: { email: email } });
    }

    return (
        <div className="register-container">
            <Header></Header>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={handleEmailChange}/>
                </div>

                <button type="submit" className="register-button">Forgot Password</button>

                <p>
                    Remember your password? <a href="/login">Login here</a>
                </p>

            </form>
        </div>
    );
}

export default ForgotPassword;
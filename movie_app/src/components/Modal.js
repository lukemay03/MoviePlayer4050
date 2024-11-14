import React from 'react';
import { useNavigate } from 'react-router-dom';

function Modal({ message, onClose, redirectUrl }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        onClose();
        navigate(redirectUrl);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Notification</h3>
                    <button onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Submit More</button>
                    <button onClick={handleRedirect}>Return</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;

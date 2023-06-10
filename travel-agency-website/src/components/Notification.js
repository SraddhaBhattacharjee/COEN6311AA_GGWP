import React from 'react';
import Toast from 'react-bootstrap/Toast';

import { useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Notification({showNotification, setShowNotification, message, description}) {
    const [position] = useState('top-end');

    return (
        <ToastContainer
            className="p-3"
            position={position}
            style={{ zIndex: 1 }}
        >
            <Toast onClose={() => setShowNotification(false)} show={showNotification} delay={5000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{message}</strong>
                    <small>just now!</small>
                </Toast.Header>
                <Toast.Body>{description}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Notification;
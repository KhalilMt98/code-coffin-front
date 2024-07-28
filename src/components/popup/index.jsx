import React from 'react';
import './style.css';

const UserPopup = ({ user, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {/* Add more user details here as needed */}
      </div>
    </div>
  );
};

export default UserPopup;

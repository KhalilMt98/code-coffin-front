import React from 'react';

import UserNav from '../../components/userNav';
import "./style.css";

const UserDashProfile = ()=>{

    return (
    
    <div className="body flex column between">
        <UserNav/>
        {/* <div className="user-info flex column center">
            <div className="info-box">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value="User Name" disabled />
                <img src="/images/editIcon.png" alt="Edit" className="edit-icon" onclick="enableEdit('name')" />
            </div>
            <div className="info-box">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value="user@example.com" disabled />
                <img src="/images/editIcon.png" alt="Edit" className="edit-icon" onclick="enableEdit('email')" />
            </div>
            <div className="info-box">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value="password123" disabled />
                <img src="/images/editIcon.png" alt="Edit" className="edit-icon" onclick="enableEdit('password')" />
            </div>
        </div> */}
    </div>
    );
};

export default UserDashProfile;
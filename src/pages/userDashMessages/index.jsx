import React from 'react';

import UserNav from '../../components/userNav';
import MessagesSideBar from '../../components/messagesSideBar';
import "./style.css";

const UserDashMessages = ()=>{

    return (
    
    <div className="body ">
        <UserNav/>
        <MessagesSideBar/>
    </div>
    );
};

export default UserDashMessages;
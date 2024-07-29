import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNav from '../../components/userNav';
import "./style.css";

const UserDashProfile = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });

    const [editableField, setEditableField] = useState(null);
    const [updatedField, setUpdatedField] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust if using a different token storage
                const response = await axios.get(`http://localhost:8000/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data.users)
                setUser(response.data.users);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = (field) => {
        setEditableField(field);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value
        }));
    };

    const handleInputBlur = async (field) => {
        setEditableField(null);

        try {
            const token = localStorage.getItem('token'); // Adjust if using a different token storage
            await axios.put(`/api/users/${user.id}`, {
                [field]: user[field]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUpdatedField(field); // Indicate success
            setTimeout(() => setUpdatedField(null), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="body flex column between">
            <UserNav />
            {/* <div className="user-info flex column center">
                <div className="info-box">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={user.name}
                        disabled={editableField !== 'name'}
                        onChange={handleInputChange}
                        onBlur={() => handleInputBlur('name')}
                        className={updatedField === 'name' ? 'updated' : ''}
                    />
                    <img
                        src="/images/editIcon.png"
                        alt="Edit"
                        className="edit-icon"
                        onClick={() => handleEditClick('name')}
                    />
                </div>
                <div className="info-box">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        disabled={editableField !== 'email'}
                        onChange={handleInputChange}
                        onBlur={() => handleInputBlur('email')}
                        className={updatedField === 'email' ? 'updated' : ''}
                    />
                    <img
                        src="/images/editIcon.png"
                        alt="Edit"
                        className="edit-icon"
                        onClick={() => handleEditClick('email')}
                    />
                </div>
                <div className="info-box">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        disabled={editableField !== 'password'}
                        onChange={handleInputChange}
                        onBlur={() => handleInputBlur('password')}
                        className={updatedField === 'password' ? 'updated' : ''}
                    />
                    <img
                        src="/images/editIcon.png"
                        alt="Edit"
                        className="edit-icon"
                        onClick={() => handleEditClick('password')}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default UserDashProfile;

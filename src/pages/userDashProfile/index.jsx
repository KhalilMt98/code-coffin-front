import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNav from '../../components/userNav';
import { useNavigate } from "react-router-dom";
import "./profile.css";

const UserDashProfile = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '' // This will be used for setting a new password
    });

    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        password: false
    });
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          verifyToken(token);
        }
      }, [navigate]);
    
      const verifyToken = async (token) => {
        try {
          const response = await axios.get("http://localhost:8000/api/verify-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.status === "success") {
            const userRole = response.data.user.role;
            if (userRole !== "user") {
              navigate("/admin");
            }
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          localStorage.removeItem("token");
          navigate("/login")
        }
      };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/users/getUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data.user;
                setUser({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    password: '' 
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFieldClick = (field) => {
        setEditableFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/users`, {
                name: user.name,
                email: user.email,
                password: user.password ? user.password : undefined
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('User data updated successfully');
            setEditableFields({ name: false, email: false, password: false });
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('An error occurred while updating user data');
        }
    };
    

    return (
        <div className="body flex column center">
            <UserNav />
            <h1>Press on Item to Edit It</h1>
            <h1>Press on the Button to Save Changes</h1>
            <div className="user-info flex column center">
                <div className="info-box" onClick={() => handleFieldClick('name')}>
                    <label>Name</label>
                    {editableFields.name ? (
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <div className="field-value">{user.name}</div>
                    )}
                </div>
                <div className="info-box" onClick={() => handleFieldClick('email')}>
                    <label>Email</label>
                    {editableFields.email ? (
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <div className="field-value">{user.email}</div>
                    )}
                </div>
                <div className="info-box" onClick={() => handleFieldClick('password')}>
                    <label>Password</label>
                    {editableFields.password ? (
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <div className="field-value">********</div>
                    )}
                </div>
                <button className="update-button" onClick={handleUpdate}>
                    <img src="/images/editIcon.png" alt="Update" className="edit-icon" />
                </button>
            </div>
        </div>
    );
};

export default UserDashProfile;
